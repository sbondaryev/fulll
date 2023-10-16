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
