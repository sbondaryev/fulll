Feature: Park a vehicle

    In order to not forget where I've parked my vehicle
    As an application user
    I should be able to indicate my vehicle location

    Background:
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet

    @critical
    Scenario: Successfully park a vehicle
        And a location
        When I try to park my vehicle with gps coordinates <latitude>, <longitude> at this location
        Then the known location of my vehicle should "<verify>" this location

        Examples:
        | latitude    | longitude     | verify |
        | 300         | 100           | false  |
        | 37.7749     | -122.4194     | true   |
        | 37.7749001  | -122.41940001 | true   |

    Scenario: Can't localize my vehicle to the same location two times in a row
        And a location
        And my vehicle has been parked into this location
        When I try to park my vehicle at this location
        Then I should be informed that my vehicle is already parked at this location
