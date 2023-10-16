# Backend : second-step
```
$ cd fulll/Backend/second-step/
$ npm install
$ npx prisma migrate dev --name init
$ npm run test:bdd
```

### Commnads
```
$ npx ts-node src/main.ts -h

Usage: main [options] [command]

Options:
  -h, --help                                                              display help for command

Commands:
  create <userId>                                                         Create a fleet
  register-vehicle <fleetId> <vehiclePlateNumber>                         Registre a vehicle
  localize-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude>  Localize a vehicle
  help [command]                                                          display help for command
```

### Commands Example
```
$ npx ts-node src/main.ts create 1
Fleet { id: 50, userId: 1, vehicles: [] }

$ npx ts-node src/main.ts register-vehicle 50 H1-6900-H2
Fleet { id: 50, userId: 1, vehicles: [ 61 ] }

$ npx ts-node src/main.ts localize-vehicle 50 H1-6900-H2 1234 5678
Vehicle { id: 61, plateNumber: 'H1-6900-H2', parkedLocationId: 38 }
```
