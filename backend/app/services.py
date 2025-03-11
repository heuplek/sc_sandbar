import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

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

def rate_sandbar(time: str, day: str):
    #Sand bar is best 1 hour before low tide
    format = '%I:%M %p'
    tide_time = datetime.strptime(time, format)
    if day == 'Sat' or day == 'Sun':
        if tide_time.hour == 15:
            return 10
        if tide_time.hour == 14 or tide_time.hour == 16:
            return 9
        if tide_time.hour == 13 or tide_time.hour == 17:
            return 8
        if tide_time.hour == 12 or tide_time.hour == 18:
            return 7
        else:
            return 0
    #weekdays we'll look for an after work low tide
    else:
        if tide_time.hour == 16 or tide_time.hour == 17:
            return 8
        if tide_time.hour == 18 or tide_time.hour == 16:
            return 7
        else:
            return 0


def calculate_best_tides(tides):
    for day in tides:
        for tide in day['tides']:
            if tide['type'] == 'L':
                tide['sandbar_rating'] = rate_sandbar(tide['time'], day['day'])
                if tide['sandbar_rating'] > 0:
                    tide['sandbar_window'] = sand_bar_windows(tide['time'])
            else:
                continue


def get_tide_times(year: int, month: int):
    if(month < 10):
        month = f'0{month}'
    tree = ET.parse('./app/data/2025_annual.xml')
    root = tree.getroot()
    tides = []
    for child in root.findall('data'):
        for item in child.findall('item'):
            if item.find('date').text[:7] == f'{year}/{month}':
                #if date is empty or does not match curr date make new date
                if not tides or tides[-1]['date'] != item.find('date').text:
                    tides.append({
                        'date': item.find('date').text,
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
    calculate_best_tides(tides)
    return {'tides': tides}