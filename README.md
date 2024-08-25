# Amethyst

## Requirement

- A pickup route is a contract with fixed arrival and departure time
- A vehicle is assigned one pickup route
- The arrival and depature times are tracked
- Late arrivals and late depatures incur a penalty

### Driver

On a driver, we need general information:

- Name and surname
- Type of driver license
- contact information

But also administrative information in the form of their legal documents.
For these documents, it is better to store them dynamically on the file system rather than in a database.

We want to keep track of a few things:

- General report (accident, operational reports)
- Medical report history (doping test)
- Vehicle assignment history

For the general and medical reports, they have the same structure. They are time-stamped entries in a database with a title, details, topics, and the driver they are about. In this case, the topics serve as tags and aid the search for a specific report.

The vehicle assignment history contains the previous vehicles the driver has been assigned to. An entry should contain the vehicle ID, the start date, and the end date in addition to the driver ID.

## Path summary

### Driver-related paths

```plaintext
- [OO] driver/                                    : List all drivers
- [OO] driver/new                                 : Register new driver
- [OO] driver/info/[driverId]                     : List info about a driver
- [OO] driver/info/[driverId]/edit                : Edit info about a driver
- [OO] driver/info/[driverId]/report/general      : Create a general report on a driver
- [OO] driver/info/[driverId]/report/medical      : Create a medical report on a driver
- [  ] driver/report/general                      : List all general report entires
- [OO] driver/report/general/new                  : Create a general report
- [  ] driver/report/general/info/[reportId]      : List info about a general report
- [  ] driver/report/general/info/[reportId]/edit : Edit a general report
- [  ] driver/report/medical                      : List all general report entires
- [  ] driver/report/medical/new                  : Create a medical report
- [  ] driver/report/medical/info/[reportId]      : List info about a medical report
- [  ] driver/report/medical/info/[reportId]/edit : Edit a medical report
```

The difference between `driver/info/[driverId]/report/general` and `driver/report/general/new` is that the former is a shorthand for the latter.
They use the same form component, but the driver field is automatically filled when reporting from `driver/info`. The same is true for medical reports.

Both general and medical reports have the same structure as defined in `types/models/` as `DriverReportModel`.

There are three databases for the drivers; the database for the drivers themselves, the database for all general report, and the database for all medical report. Thus, the id of a report is "globally" incremented. Imagine the opposite of a GitHub issue where each repository contains its own "issue 1," this implementation means the adjacent reports on a driver may not have adjacent ids.

#### Flow

```plaintext
drivers/
-> drivers/new                 : Can navigate to
-> drivers/info/[driverId]     : Can navigate to
-> drivers/report/general/new  : Can navigate to
-> drivers/report/medical/new  : Can navigate to

drivers/new
-> drivers/info/[driverId] : Redirects to on successful submit
-> drivers/                : Redirects to on cancel

drivers/info/[driverId]
-> drivers/                               : Can return to
-> drivers/info/[driverId]/edit           : Can navigate to
-> drivers/info/[driverId]/report/general : Can navigate to
-> drivers/info/[driverId]/report/medical : Can navigate to

drivers/info/[driverId]/edit
-> drivers/info/[driverId] : Redirects to on submit or cancel

drivers/info/[driverId]/report/general
-> drivers/report/general/info/[reportId] : Redirects to on successful submit
-> drivers/info/[driverId]                : Redirects to on cancel

drivers/report/general/new
-> drivers/report/general/info/[reportId] : Redirects to on successful submit
-> drivers/                               : Redirects to on cancel

drivers/report/general/info/[reportId]
-> drivers/report/general                      : Return to if came from
-> drivers/info/[driverId]                     : Return to if came from
-> drivers/report/general/info/[reportId]/edit : Can navigate to
```
