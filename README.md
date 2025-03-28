# sc_sandbar
Beaufort Sandbar Calendar - WIP

# About
This project is a simple calendar that shows the best days to visit the sandbar in Beaufort, SC. The calendar is based on the tide schedule for the area overlayed with a 7 day forecast to generate a rating for low tide days. The rating is rather arbitrary and revolves around my personal schedule. Low tides in the late afternoon during the week are rated highly for after work trips, while low tides in the early afternoon on the weekend are rated highly for weekend trips. The calendar is generated using Python and FastAPI. 
The front end is coded using React and intentionally avoiding the use of 3rd party libraries.

# Docker
To run 

`docker compose up -d`

# Without Docker
Backend
 `pip install requirements.txt`
 `python main.py`
 
 Frontend
 `npm run dev`
