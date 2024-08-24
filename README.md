# Amethyst

## Path summary

### Driver-related paths

```plaintext
- driver/                               : List all drivers
- driver/new                            : Register new driver
- driver/info/[driverId]                : List info about a driver
- driver/info/[driverId]/edit           : Edit info about a driver
- driver/info/[driverId]/report/general : Create a general report on a driver
- driver/info/[driverId]/report/medical : Create a medical report on a driver
- driver/report/general                 : List all general report entires
- driver/report/general/new             : Create a general report
- driver/report/general/[reportId]      : List info about a general report
- driver/report/general/[reportId]/edit : Edit a general report
- driver/report/medical                 : List all general report entires
- driver/report/medical/new             : Create a medical report
- driver/report/medical/[reportId]      : List info about a medical report
- driver/report/medical/[reportId]/edit : Edit a medical report
```

The difference between `driver/info/[driverId]/report/general` and `driver/report/general/new` is that the former is a shorthand for the latter.
They use the same form component, but the driver field is automatically filled when reporting from `driver/info`. The same is true for medical reports.

Both general and medical reports have the same structure as defined in `types/models/` as `DriverReportModel`.

There are three databases for the drivers; the database for the drivers themselves, the database for all general report, and the database for all medical report. Thus, the id of a report is "globally" incremented. Imagine the opposite of a GitHub issue where each repository contains its own "issue 1," this implementation means the adjacent reports on a driver may not have adjacent ids.
