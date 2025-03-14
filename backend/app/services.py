import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import requests

##Stuffing everything into a single file for now since we're only using one endpoint

##Function that calculates time window sandbar is exposed
def sand_bar_windows(time: str):
    #Sand bar is out for 3 hours?
    am_pm = time[-2:]
    tide_time = time[:-3]
    format = '%I:%M %p'
    tide_time = datetime.strptime(time, format)
    before_low = tide_time - timedelta(hours=1, minutes=30)
    before_low = before_low.strftime(format)
    after_low = tide_time + timedelta(hours=1, minutes=30)
    after_low = after_low.strftime(format)
    return {f'{before_low} - {after_low}'}

##Function that rates the sandbar based on time of day
def rate_sandbar(time: str, day: str):
    format = '%I:%M %p'
    tide_time = datetime.strptime(time, format)
    if day == 'Sat' or day == 'Sun':
        if tide_time.hour == 15 or tide_time.hour == 14:
            return 5
        if tide_time.hour == 13 or tide_time.hour == 16:
            return 4
        if tide_time.hour == 12 or tide_time.hour == 17:
            return 3
        if tide_time.hour == 11 or tide_time.hour == 18:
            return 2
        else:
            return 0
    #weekdays we'll look for an after work low tide
    else:
        if tide_time.hour == 16 or tide_time.hour == 17:
            return 4
        if tide_time.hour == 18 or tide_time.hour == 16:
            return 3
        else:
            return 0

##Function that adjusts the sandbar rating based on weather
def weather_adjusted_rating(rating: float, weather: list):
    for period in weather:
        if "night" not in period['name'].lower():
            if rating == 0:
                return 0
            print(period['percipChance'])
            if period['percipChance'] is not None and period['percipChance'] > 60:
                rating -= 1
            elif period['percipChance'] is not None and period['percipChance'] > 30:
                rating -= 0.5
            if period['temperature'] < 70:
                rating -= 1
            elif period['temperature'] < 80:
                rating -= 0.5
    return rating

##Function that calculates the best tides
def calculate_best_tides(tides, weather):
    for day in tides:
        print(day)
        for tide in day['tides']:
            if tide['type'] == 'L':
                tide['sandbar_rating'] = rate_sandbar(tide['time'], day['day'])
                tide['sandbar_window'] = sand_bar_windows(tide['time'])
                if day['date'] in weather:
                    print(f'have weather for {day["date"]}')
                    tide['sandbar_rating'] = weather_adjusted_rating(tide['sandbar_rating'], weather[day['date']])
            else:
                continue

#Gets new NOAA weather endpoint if they changed the grids
def get_new_endpoint():
    ##TODO to add a log here so I can update the endpoint in the future
    lat_long = "https://api.weather.gov/points/32.4258,-80.6869"
    response = requests.get(lat_long)
    gridpoints = response.json()
    return gridpoints['properties']['forecast']

#calls the standard weather API
def get_weather():
    weather_api = "https://api.weather.gov/gridpoints/CHS/61,58/forecast"
    weather = {}
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



def get_tide_times(year: int, month: int):
    if month > 10 or month < 3:
        return "Its off season"
    if(month < 10):
        month = f'0{month}'
    seven_day_forecast = get_weather()
    tree = ET.parse('./app/data/2025_annual.xml')
    root = tree.getroot()
    tides = []
    for child in root.findall('data'):
        for item in child.findall('item'):
            if item.find('date').text[:7] == f'{year}/{month}':
                date_object = datetime.strptime(item.find('date').text, "%Y/%m/%d") # Parse the date string into a datetime object
                formatted_date = date_object.strftime("%Y-%m-%d")
                #if date is empty or does not match curr date make new date
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
    calculate_best_tides(tides, seven_day_forecast)
    return {'tides': tides, 'weather': seven_day_forecast}