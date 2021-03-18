# Breezy HR Recruitment Analytics
If your company's recruitment department uses **[Breezy HR](https://breezy.hr)** as application tracking system, this app might enhance your **recruiting analytics** capabilities. 

**This app allows you to:**
- Store all candidate-data in a SQL database, completely anonymised for as long as you want.
- Provide constantly updated  data and timelines about your current vacancies, candidates and every action of the candidate-journey including timestamps.
- Store data in an optimised structure for more advanced analytics than provided by the Breezy App itself.
- Error logs in extra file (errors.log)
 … and many more things!

At the moment I’m using this app with **MySQL** and **Tableau** for data-visualisation!

## Installation
- Node.js
- MySQL
- Dependencies from package.json

## How to use
Create a .env file with
```sh
COMPANY_ID=[breezy_company_id]
AUTH TOKEN=[breezy_auth_token]
DB_HOST=[host] 
DB_USER=[db_user]
DB_PASSWORD=[db_password]
DATABASE=[db_name]
```

Run **positions.js** to keep your position data uptodate (published and closed ones)
Run **candidates.js** to keep updating the latest candidate data
Run **stream.js** to keep updating the lastest candidate actions 

## Project status: 
This project is just at the very beginning and far from finished. First and foremost, it’s a training ground for me, a non-professional programmer, with the pleasant side effect that it scratches my own itch as a Tech Recruiter.

## Planned next: 
Better error tracing
Integrate **Calendly** data.
Integrate **Google Calendar** data.

Feedback is always very welcome!


## License

MIT
**Free Software, Hell Yeah!**