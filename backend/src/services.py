import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import requests
import requests_cache
##Stuffing everything into a single file for now since we're only using one endpoint
##NOAA updates the API every 6 hours so we can cache the response for a few hours
requests_cache.install_cache('cache', expire_after=10800) # 3 hours
"""
===============================================================================
sand_bar_windows
    @input time: datetime low tide
    @ret fstring: set of strings with the 3 hour window around the low tide that
     we rated

===============================================================================
"""
def sand_bar_windows(time: str):
    am_pm = time[-2:]
    tide_time = time[:-3]
    # if am_pm == 'AM' and tide_time.startswith('12'):
    #     return None
    # elif (am_pm == 'AM' and tide_time < '09:00') or (am_pm == 'PM' and tide_time > '09:00') :
    #     if not tide_time.startswith('12'):
    #         return None
    format = '%I:%M %p'
    tide_time = datetime.strptime(time, format)
    before_low = tide_time - timedelta(hours=1, minutes=30)
    before_low = before_low.strftime(format)
    after_low = tide_time + timedelta(hours=1, minutes=30)
    after_low = after_low.strftime(format)
    return {f'{before_low} - {after_low}'}

"""
===============================================================================
determine_time_difference
    @input ideal_low: datetime of ideal low tide
    @input target_time: datetime og low tide

    @ret minutes: int minutes outside of 1 hour window around ideal time

===============================================================================
"""
def determine_time_difference(ideal_low, target_time):
    start_time = ideal_low - timedelta(minutes=30)
    end_time = ideal_low + timedelta(minutes=30)
    
    if target_time > start_time and target_time < end_time:
        return 0
    elif target_time < start_time:
        combined_datetime = datetime.combine(datetime.today(), target_time.time())
        start_datetime = datetime.combine(datetime.today(), start_time.time())
        return int((start_datetime - combined_datetime).total_seconds() / 60)
    else:
        combined_datetime = datetime.combine(datetime.today(), target_time.time())
        end_datetime = datetime.combine(datetime.today(), end_time.time())
        return int((combined_datetime - end_datetime).total_seconds() / 60)

def float_hour_to_time(float_hour):
    hours = int(float_hour)
    minutes = round((float_hour - hours) * 60)
    return datetime.time(hours, minutes)

"""
===============================================================================
rate_sandbar
    @input year: int year to get tide times for
    @input month: int month to get tide times for
    @input weekdayIdealLow: float user input for ideal low tide on weekdays
    @input weekendIdealLow: float user input for ideal low tide on weekends

    @ret rating: float preadjusted rating

    @desc: calculates initial rating based on time
===============================================================================
"""
def rate_sandbar(time: str, day: str, weekdayIdealLow: float, weekendIdealLow: float):
    time_format = '%I:%M %p'
    other_format = '%H:%M:%S'
    rating = 5
    tide_time = datetime.strptime(time, time_format)
    if day == 'Sat' or day == 'Sun':
        weekendIdealLow= str(timedelta(hours=weekendIdealLow))
        weekendIdealLow = datetime.strptime(weekendIdealLow, other_format)
        dif = determine_time_difference(weekendIdealLow, tide_time)
    else:
        weekdayIdealLow = str(timedelta(hours=weekdayIdealLow))
        weekdayIdealLow = datetime.strptime(weekdayIdealLow, other_format)
        dif = determine_time_difference(weekdayIdealLow, tide_time)

    if dif == 0:
        return rating
    else:
        remove = 0.5 * (dif / 30)
        remove = round(remove *2 ) / 2
        return max(0, rating - remove)

"""
===============================================================================
weather_adjusted_rating
    @input rating: int pre-adjusted rating
    @input weather: weather forecast for the day

    @ret rating: float adjusted rating

    @desc: Removes stars from the rating based on the weather forecast for the day
===============================================================================
"""
def weather_adjusted_rating(rating: float, weather: list):
    for period in weather:
        if "night" not in period['name'].lower():
            if rating == 0:
                return 0
            if period['percipChance'] is not None and period['percipChance'] > 80:
                rating -= 3
            elif period['percipChance'] is not None and period['percipChance'] > 60:
                rating -= 1.5
            elif period['percipChance'] is not None and period['percipChance'] > 30:
                rating -= 1
            elif period['percipChance'] is not None and period['percipChance'] > 20:
                rating -= 0.5
            if period['temperature'] < 70:
                rating -= 1
            elif period['temperature'] < 80:
                rating -= 0.5
    return max(0, rating)

"""
===============================================================================
calculate_best_tides
    @input year: int year to get tide times for
    @input month: int month to get tide times for
    @input weekdayIdealLow: float user input for ideal low tide on weekdays
    @input weekendIdealLow: float user input for ideal low tide on weekends

    @ret dict: returns a dictionary with the tides and weather for the month

    @desc: This gives the star rating for each tide based on the user's ideal
    low tide times and the weather forecast.
===============================================================================
"""
def calculate_best_tides(tides, weather, weekdayIdealLow, weekendIdealLow):
    for day in tides:
        for tide in day['tides']:
            if tide['type'] == 'L':
                tide['sandbar_rating'] = rate_sandbar(tide['time'], day['day'], weekdayIdealLow, weekendIdealLow)
                if day['date'] in weather:
                    tide['sandbar_rating'] = weather_adjusted_rating(tide['sandbar_rating'], weather[day['date']])
                if tide['sandbar_rating'] is not None and tide['sandbar_rating'] != 0:
                    tide['sandbar_window'] = sand_bar_windows(tide['time'])
            else:
                continue

"""
===============================================================================
get_new_endpoint
    @ret str with new endpoint

    @desc: This function gets the new endpoint for the NOAA weather API if the
    gridpoints have changed.
===============================================================================
"""
def get_new_endpoint():
    ##TODO to add a log here so I can update the endpoint in the future
    lat_long = "https://api.weather.gov/points/32.4258,-80.6869"
    headers={'User-Agent': ('https://sc-sandbar.onrender.com/tides, heuple.kevin@gmail.com')}
    response = requests.get(lat_long)
    gridpoints = response.json()
    return gridpoints['properties']['forecast']

"""
===============================================================================
get_weather
    @ret dict: returns a dictionary with the weather for the next 7 days

    @desc: This function gets the weather forecast for the next 7 days using the
     NOAA endpoint for Beaufort SC
===============================================================================
"""
def get_weather():
    weather_api = "https://api.weather.gov/gridpoints/CHS/61,58/forecast"
    weather = {}
    #print(f"session is cached? {session.cache.contains(url=weather_api)} ")
    response = requests.get(weather_api)
    forecast = response.json()
    if 'properties' not in forecast:
        #assume gridpoints changed
        new_endpoint = get_new_endpoint()
        response = requests.get(new_endpoint)
        forecast = response.json()
        if 'properties' not in forecast:
            #still not working, fail quietly and log error
            #TODO add logging
            return "Error: Weather API is down"
    forecast = forecast['properties']['periods']
    for period in forecast:
        date = period['startTime'][:10]
        percipChance = period['probabilityOfPrecipitation']['value']
        if date not in weather:
            weather[date] = ([{
                'name': period['name'],
                'percipChance': percipChance,
                'detailedForecast': period['detailedForecast'],
                'temperature': period['temperature'],
                'windSpeed': period['windSpeed'],
                'date': date
            }])
        else:
            weather[date].append({
                'name': period['name'],
                'percipChance': percipChance,
                'detailedForecast': period['detailedForecast'],
                'temperature': period['temperature'],
                'windSpeed': period['windSpeed'],
                'date': date
            })
    return weather


"""
===============================================================================
get_tide_times
    @input year: int year to get tide times for
    @input month: int month to get tide times for
    @input weekdayIdealLow: float user input for ideal low tide on weekdays
    @input weekendIdealLow: float user input for ideal low tide on weekends

    @ret dict: returns a dictionary with the tides and weather for the month

    @desc: This function gets the tide times for the month and year specified. 
    It then calculates the best tides based on the user's ideal low tide times 
    and the weather forecast. It returns a dictionary with the tides and weather 
    for the month.
===============================================================================
"""
def get_tide_times(year: int, month: int, weekdayIdealLow: float, weekendIdealLow: float):
    if month > 10 or month < 3:
        return "It's Off Season"
    if(month < 10):
        month = f'0{month}'
    ##TODO need to cache this response so I don't have to fetch it every time
    seven_day_forecast = get_weather()
    tree = ET.parse('./src/data/2025_annual.xml')
    root = tree.getroot()
    tides = []
    for child in root.findall('data'):
        for item in child.findall('item'):
            if item.find('date').text[:7] == f'{year}/{month}':
                date_object = datetime.strptime(item.find('date').text, "%Y/%m/%d") # Parse the date string into a datetime object
                formatted_date = date_object.strftime("%Y-%m-%d")
                #if date is empty r does not match curr date make new date
                if not tides or tides[-1]['date'] != formatted_date:
                    tides.append({
                        'date': formatted_date,
                        'day': item.find('day').text,
                        'tides': [{
                            'type': item.find('highlow').text,
                            'time': item.find('time').text,
                            'height': item.find('pred_in_ft').text
                        }]
                    })
                else:
                    tides[-1]['tides'].append({
                        'type': item.find('highlow').text,
                        'time': item.find('time').text,
                        'height': item.find('pred_in_ft').text
                    })
    calculate_best_tides(tides, seven_day_forecast, weekdayIdealLow, weekendIdealLow)
    return {'tides': tides, 'weather': seven_day_forecast}