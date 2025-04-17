# sc_sandbar
Beaufort Sandbar Calendar - WIP

Currently running on free verison of onRender - initial load times will be slow as it spins down after 15 minutes idle. 
https://battery-creek-sandbar.onrender.com/

# About
This project is a simple calendar that shows the best days to visit the sandbar in Beaufort, SC. The calendar is based on the tide schedule for the area overlayed with a 7 day forecast to generate a rating for low tide days. The rating is dynamic an allows the user to adjust the ratings based on their personal calendar. Detailed information about the rating scale can be found in the about page. The UI is dynamic but screen limitations allow only single day views on mobile while desktop can view full months.
The calendar is generated using Python and FastAPI. 
The front end is coded using React and intentionally avoiding the use of 3rd party libraries.


NOTE: currently adding envs to backend for now local IP needs to be whitelisted in origins api.py to run locally.
For front end Copy .env.dev to .env.local 
# Docker
To run 

`docker compose up -d`

# Without Docker
Backend
 `pip install requirements.txt`
 `python main.py`
 
 Frontend
 `npm run dev`
