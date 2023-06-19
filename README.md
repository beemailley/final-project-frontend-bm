# About Samlas
Samlas is a web app where expats can find events where they can meet other expats. Users are able to register and log in. Once they are logged in, they are ale to create, update, and view their user data and event preferences. They are also able to create and update events, and mark themselves as attending other events. 

## Our Process
Once we had the idea for the project we began by planning the MVP, stretch goals, tech stack, weekly roadmap, and initial wireframes. When we started working on the project, we realized that our MVP was too ambitious for the time we had. So, we re-scoped the MVP and implemented some additional tracking and communication tools and touchpoints. We implemented a Kanban board with Backlog, To-Do, In Progress, Needs Review, Done, To-Do Stretch Goals, and Not Doing categories. We video called every day at least once where we reviewed our previous day’s work and upcoming day’s work everyday so we could continue progressing. We moved features to the stretch goal or “not doing” piles if they didn’t serve the spirit of the MVP (a platform to build community) or the stated MVP (user profiles and events). As we realized gaps in our planning or the user experience, we re-prioritized features to ensure that we would have a functional MVP by the demo. 
    
## Future Features
1. Add Filtering to All Users and User Events pages to allow users to filter by interest or location
1. Improve All Users and User Event functionality - introduce pagination for each, and only show future events. 
1. Introduce user avatars or profile photos
1. Introduce event photos
1. Implement consistent loading screens across all pages, introduce a branded or animated loading feature
1. Implement additional event features like a “My Events” page where organizers can see all of their events and/or users can see all events they’ve signed up for; and the ability to delete an event
1. Implement additional admin features like being able to delete a user (frontend and backend) and the ability to update passwords
1. Implement a hamburger menu on mobile
1. Add events from city-based API(s) - e.g. APIs that show events organized not just by our members but by other organizations or artists in the city - for Stockholm and potentially other cities.
1. Implement a chat feature to allow members to chat with each other
1. Implement a members forum to allow members to help each other find community
1. Collaborate with UX designer to improve user flows and update the UI

## Known Bugs
### Styling
1. The Footer floats off of the bottom of the screen on certain screen sizes. Need to investigate which sizes are the problem and fix it to the bottom of the screen.
1. Alignment on All Users and User Events pages. Entries are centered so if there is a long username or long event title, they don’t line up with other user profiles or event listings. Need to update the alignment. But, this will require updating the global styles for the card container or creating a new container. 
### Frontend
1. The My Profile shows data inconsistently. It is the same page as any other user profile. So, there must be “Profile Items” in the redux store in order for the page to show information. So, if the user has refreshed the page, there are no “Profile Items” in the store until they revisit the All Users page and (possibly) click into a profile. Then the My Profile click will show the user their own profile again. Need to investigate further how to fix.
1. Password validation is inconsistent for the registration form. Users can sometimes use a password that is less than 6 characters. Need to investigate further both when this doesn’t work and how to fix.
1. When logging out from the Events or Members pages, the user gets an alert to log in and is taken to the log in page. This is a bit jarring. It is because there is a useEffect that navigates the user away from the page if they do not have an accessToken in local storage. Need to investigate how to fix.
1. Country List NPM package - shows countries alphabetized by country code, not by country name. Need to investigate if it is possible to fix. Or, investigate other npm packages. If choose a different package, then the backend would need to be updated as well.
