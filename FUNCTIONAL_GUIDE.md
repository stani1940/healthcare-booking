# Healthcare Booking - Functional Guide

This guide describes the functionality currently present in the application.

## 1. Project Overview

Healthcare Booking is a React single-page application for a healthcare center. Visitors can browse information about the center and its doctors. Signed-in users can book and manage appointments. The application uses Supabase for authentication and data storage.

## 2. User Access & Permissions

- Public pages include the home page, center information, doctors, news, contact information, and the appointment form.
- Registration and login are available to visitors.
- The appointment form requires a signed-in user when submitted.
- The dashboard, doctor management, and appointments routes require a signed-in session and redirect to `/login` otherwise.
- The navigation displays links such as My Appointments and Add Doctor when a session exists.
- These routes require authentication but do not check for a particular user role. Actual data permissions still depend on the Supabase policies configured for the project.

## 3. Authentication & Session Handling

Registration, login, and logout use the Supabase JavaScript client and Supabase Auth.

- Registration sends email, password, username, and name to Supabase Auth. After registration, the user is redirected to login.
- Login uses email and password. On success, the user is redirected to `/dashboard`.
- `AuthContext` provides the current session, user, and sign-in, sign-up, and sign-out functions to the React app.
- An auth-state listener updates the context and stores the `access_token` in `localStorage`; it removes the token on sign-out.

## 4. Routing Structure

The app uses React Router with these routes. A shared `SiteLayout` supplies the top bar, navigation, and footer to appointment, dashboard, doctor, and appointment-management pages. The dashboard, doctors, and appointments management routes are wrapped in a simple authentication check and redirect signed-out visitors to `/login`.

| Route | Page |
| --- | --- |
| `/` | Home page |
| `/appointment` | Appointment form |
| `/login` | Home page with the login modal |
| `/register` | Home page with the registration modal |
| `/add-doctor` | Add Doctor form |
| `/dashboard` | Dashboard |
| `/dashboard/doctors` | Doctors list |
| `/dashboard/appointments` | Appointments management |
| `/my-appointments` | Appointments management |

The route check requires a signed-in user; role-based access is not implemented.

## 5. List → Details Flow

Doctors are shown as a list of cards. A separate doctor-details page or route has not been implemented.

## 6. Data Source & Backend

Supabase provides authentication and a PostgreSQL database through its client library and REST API. The frontend reads its Supabase URL and publishable key from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

## 7. Data Operations (CRUD)

- **Doctors:** Read doctors for display and appointment selection; create a doctor through the Add Doctor form.
- **Appointments:** Create an appointment, read and list appointments, update appointment details, and delete an appointment.
- Appointment changes are sent to Supabase REST endpoints. The records and operations accessible to a user also depend on the configured Supabase database policies.

## 8. Forms & Validation

- **Register:** Checks that password and confirmation match. Email uses an email input; authentication errors are displayed.
- **Login:** Uses email and password inputs; authentication errors are displayed.
- **Appointment:** Loads doctors for selection and requires a signed-in user on submission. Users select the appointment date with a date picker and the time with a time picker in 30-minute intervals. The form does not currently perform explicit client-side required-field validation for doctor, date, or time.
- **Edit Appointment:** Uses date and time pickers, with time choices in 30-minute intervals. It explicitly checks that a doctor, date, and time are selected before updating. Notes are optional.
- **Add Doctor:** Collects name, specialty, phone, email, and image path. There is no explicit client-side validation or visible error message when the request fails.

## 9. React-Specific Techniques

The app uses `useState` for form and page state, `useEffect` for data loading and auth-state subscription, and `useNavigate` for navigation. It also implements Context API through `AuthContext` and `AuthProvider` to share authentication state and actions. Shared page structure is provided with a React layout component and nested routes.

## 10. Typical User Flow

1. A visitor browses the home page and doctors list.
2. The visitor registers and is directed to login.
3. After login, the user is directed to the dashboard.
4. The user opens the appointment form, selects a doctor, date, and time, and submits.
5. On successful creation, the app directs the user to My Appointments, where appointments can be edited or deleted.

## 11. Error & Edge Case Handling

- Login and registration display authentication errors and disable their submit button while a request is in progress.
- The appointment form displays doctor-loading and submission errors, and appointment-list pages display loading, error, and empty-list messages.
- Appointment update and delete operations display success or error feedback.
- The doctors list displays loading and error states.
- Add Doctor currently logs request errors to the console without showing feedback in the interface.
