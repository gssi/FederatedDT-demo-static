# Evaluation results

Raw per-row results of the evaluation reported in the paper, exported from the
spreadsheet used during the runs. Two evaluation questions, two sections.

* **EQ1** — configuration variation and reuse: one row per deployment configuration,
  with the four sub-question checks and the timing measures.
* **EQ2** — assisted model evolution: one row per step of the eight-step sequence, per
  domain and execution mode.

All durations are in **milliseconds**, as recorded. The paper reports seconds and
milliseconds as noted in its tables.

> The column names and run identifiers below keep the `rq1_*` / `rq2-*` spelling used
> while the experiments were run; the paper renames these to EQ1 and EQ2. The two
> refer to the same checks.

## Measures

| Measure | Column | From | To |
|---|---|---|---|
| M1 | `m1_commit_to_last_bundle_ms` | model commit | last controller holding the bundle for that version |
| M1a | `m1a_commit_to_fleet_ms` | model commit | federation serving that version |
| M2 | `m2_apply_to_last_twin_ms` | shared-statechart distribution | activation on the last participating controller |
| M3 | `m3_reader_to_actuation_ms_median` | reader event | first actuation command (median over granted requests) |
| M4 | `m4_change_to_observation_ms` | hardware change | observation available in the store used by the modeling assistant |

## EQ1 — configuration variation and reuse

`pass` is the conjunction of the four sub-question checks. `probes_failed` counts
access probes whose decision or reason differed from the expected one.

### Simulated devices

| run | config | domain | origin | mode | EQ1.1 twin | EQ1.2 fleet | EQ1.3 injection | EQ1.4 override | pass | probes | failed | M1 (ms) | M1a (ms) | M2 (ms) | M3 (ms) | M3 n |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| sim-2026-09-23 | office-01 | office | seed | sim | yes | yes | yes | yes | yes | 18 | 0 | 3292 | 707 | 26 | 12 | 12 |
| sim-2026-09-23 | home-01 | home | seed | sim | yes | yes | yes | yes | yes | 12 | 0 | 5717 | 770 | 22 | 8 | 5 |
| sim-2026-09-23 | fitness-01 | fitness | seed | sim | yes | yes | yes | yes | yes | 18 | 0 | 7766 | 744 | 22 | 10 | 10 |
| sim-2026-09-23 | office-02 | office | generated | sim | yes | yes | yes | yes | yes | 12 | 0 | 2961 | 694 | 17 | 9 | 2 |
| sim-2026-09-23 | office-03 | office | generated | sim | yes | yes | yes | yes | yes | 22 | 0 | 6523 | 1074 | 25 | 9 | 12 |
| sim-2026-09-23 | office-04 | office | generated | sim | yes | yes | yes | yes | yes | 18 | 0 | 10476 | 815 | 20 | 9 | 10 |
| sim-2026-09-23 | office-05 | office | generated | sim | yes | yes | yes | yes | yes | 18 | 0 | 4214 | 734 | 25 | 9 | 10 |
| sim-2026-09-23 | office-06 | office | generated | sim | yes | yes | yes | yes | yes | 16 | 0 | 10679 | 1252 | 16 | 5 | 10 |
| sim-2026-09-23 | office-07 | office | generated | sim | yes | yes | yes | yes | yes | 22 | 0 | 9822 | 1037 | 22 | 6 | 4 |
| sim-2026-09-23 | office-08 | office | generated | sim | yes | yes | yes | yes | yes | 20 | 0 | 9239 | 761 | 20 | 9 | 8 |
| sim-2026-09-23 | home-03 | home | generated | sim | yes | yes | yes | yes | yes | 12 | 0 | 8288 | 838 | 26 | 9 | 4 |
| sim-2026-09-23 | home-04 | home | generated | sim | yes | yes | yes | yes | yes | 12 | 0 | 9451 | 793 | 21 | 7 | 6 |
| sim-2026-09-23 | home-05 | home | generated | sim | yes | yes | yes | yes | yes | 14 | 0 | 6333 | 603 | 18 | 7 | 6 |
| sim-2026-09-23 | home-06 | home | generated | sim | yes | yes | yes | yes | yes | 10 | 0 | 3400 | 1057 | 20 | 7 | 2 |
| sim-2026-09-23 | home-07 | home | generated | sim | yes | yes | yes | yes | yes | 12 | 0 | 3854 | 1034 | 11 | 7 | 2 |
| sim-2026-09-23 | home-08 | home | generated | sim | yes | yes | yes | yes | yes | 20 | 0 | 7991 | 958 | 20 | 6 | 7 |
| sim-2026-09-23 | home-09 | home | generated | sim | yes | yes | yes | yes | yes | 22 | 0 | 6172 | 682 | 35 | 5 | 6 |
| sim-2026-09-23 | home-10 | home | generated | sim | yes | yes | yes | yes | yes | 12 | 0 | 9204 | 765 | 26 | 9 | 4 |
| sim-2026-09-23 | fitness-02 | fitness | generated | sim | yes | yes | yes | yes | yes | 20 | 0 | 3393 | 843 | 18 | 7 | 8 |
| sim-2026-09-23 | fitness-03 | fitness | generated | sim | yes | yes | yes | yes | yes | 18 | 0 | 3903 | 772 | 21 | 6 | 8 |
| sim-2026-09-23 | fitness-04 | fitness | generated | sim | yes | yes | yes | yes | yes | 10 | 0 | 6298 | 849 | 29 | 7 | 2 |
| sim-2026-09-23 | fitness-05 | fitness | generated | sim | yes | yes | yes | yes | yes | 20 | 0 | 3144 | 687 | 15 | 10 | 2 |
| sim-2026-09-23 | fitness-06 | fitness | generated | sim | yes | yes | yes | yes | yes | 14 | 0 | 2996 | 750 | 15 | 7 | 6 |
| sim-2026-09-23 | fitness-08 | fitness | generated | sim | yes | yes | yes | yes | yes | 10 | 0 | 203335 | 198470 | 21 | 8 | 4 |
| sim-2026-09-23 | fitness-09 | fitness | generated | sim | yes | yes | yes | yes | yes | 20 | 0 | 7325 | 1375 | 20 | 7 | 10 |
| sim-2026-09-23 | fitness-10 | fitness | generated | sim | yes | yes | yes | yes | yes | 14 | 0 | 6964 | 771 | 22 | 6 | 5 |
| sim-2026-09-23 | office-09 | office | generated | sim | yes | yes | yes | yes | yes | 16 | 0 | 11220 | 1216 | 20 | 4 | 5 |
| sim-2026-09-23 | office-10 | office | generated | sim | yes | yes | yes | yes | yes | 14 | 0 | 8060 | 757 | 20 | 6 | 4 |
| sim-2026-09-23 | home-02 | home | generated | sim | yes | yes | yes | yes | yes | 10 | 0 | 5300 | 622 | 29 | 10 | 2 |
| sim-2026-09-23 | fitness-07 | fitness | generated | sim | yes | yes | yes | yes | yes | 20 | 0 | 4032 | 765 | 20 | 6 | 12 |

### Physical controllers

| run | config | domain | origin | mode | EQ1.1 twin | EQ1.2 fleet | EQ1.3 injection | EQ1.4 override | pass | probes | failed | M1 (ms) | M1a (ms) | M2 (ms) | M3 (ms) | M3 n |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| hw-2026-09-24 | office-01 | office | seed | hw | yes | yes | yes | yes | yes | 10 | 0 | 7499 | 1295 | 39 | -- | -- |
| hw-2026-09-24 | home-01 | home | seed | hw | yes | yes | yes | yes | yes | 10 | 0 | 7028 | 641 | 23 | -- | -- |
| hw-2026-09-24 | fitness-01 | fitness | seed | hw | yes | yes | yes | yes | yes | 10 | 0 | 3664 | 794 | 24 | -- | -- |

**Notes.**

* `office-01, home-01, fitness-01` — M3 not valid on this run: the runner took an occupancy-region actuation before the tap (fixed after the run); raw instants in runs/hw-2026-09-24

### Derived summary (the figures reported in the paper)

Median [min, max] per domain over the simulated configurations; the fitness-center
execution `fitness-08` is excluded from every fitness summary below and reported
separately. Physical figures are the single instrumented configuration per domain.

| Domain | Conf. | Probes | M1 (s) | M1a (s) | M2 (ms) | M3 (ms) |
|---|---|---|---|---|---|---|
| Home | 10 | 136 | 6.3 [3.4, 9.5] | 0.78 [0.60, 1.06] | 22 [11, 35] | 7 [5, 10] |
| Office | 10 | 176 | 8.6 [3.0, 11.2] | 0.79 [0.69, 1.25] | 20 [16, 26] | 9 [4, 12] |
| Fitness | 10 | 164 | 4.0 [3.0, 7.8] | 0.77 [0.69, 1.38] | 20 [15, 29] | 7 [6, 10] |
| Home (physical) | 1 | 10 | 7.0 | 0.64 | 23 | -- |
| Office (physical) | 1 | 10 | 7.5 | 1.30 | 39 | -- |
| Fitness (physical) | 1 | 10 | 3.7 | 0.79 | 24 | -- |

`fitness-08` is reported separately: M1 203335 ms (203.3 s), of which 198470 ms (198.5 s) before the federation, caused by a retried database read. Including it, the fitness-center M1 median is 5.2 s.

Totals: 476 simulated probes and 30 physical taps, 0 mismatches.

## EQ2 — assisted model evolution

The sequence is cumulative: each step starts from the state left by its predecessor.
Each step is checked on the runtime observation, the proposal raised by the modeling
environment, and the decision of the model repository.

### M4 per step (median over the three domains)

| # | Change | M4 sim (ms) | M4 physical (ms) |
|---|---|---|---|
| 1 | plug ambient (illuminance) on dev1 | 1766 | 730 |
| 2 | plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2 | 1529 | 3837 |
| 3 | model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight | -- | -- |
| 4 | unplug dev2 ambient (used by nothing) | 1547 | 2608 |
| 5 | unplug dev2 soundPressure (one of two inputs of decibel.max) | 2155 | 3572 |
| 6 | unplug dev1 ambient (only input of illuminance.avg, measured by the goal) | 2348 | 6180 |
| 7 | replace the controller of dev2 (new X-Device-Id) | 9036 | 14681 |
| 8 | re-plug dev2 ambient, then unplug it before accepting the proposal | 1223 | 10730 |

* 18 sensor-related changes in simulation: median 1676 ms, range 172–2681 ms.
* 18 sensor-related changes in physical hardware: median 4434 ms, range 136–57710 ms.
* Controller replacement in simulation: 6404, 9036, 9073 ms.
* Controller replacement in physical hardware: 13064, 14681, 20104 ms.

### Per-run detail

Cell values are reproduced as recorded. Some JSON values were truncated by the
spreadsheet export and are shown as they appear there.

#### office — simulation (`rq2-2026-09-23`)

**Step 1 — plug ambient (illuminance) on dev1**

* runtime effect (yes):

  ```json
  {"keyObserved":true,"modelledBefore":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED`
* commit (yes):

  ```json
  {"sensorAtO0":{"sensors":["dev1_illuminance"],"target":"O0","status":200,"version":2},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 1913 ms · step passed: yes

**Step 2 — plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2**

* runtime effect (yes):

  ```json
  {"keysObserved":["decibel"]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[decibel] A2:SENSOR_UNMODELLED (2 sensors on dev2)`
* commit (yes):

  ```json
  {"typeAtO1":{"target":"O1","status":200,"version":2},"sensorsAtO0":[{"sensors":["dev1_decibel"],"target":"O0","status":200,"version":4},{"target":"O0","status":200,"version":5}],"conformance":{"errors
  ```
* M4: 172 ms · step passed: yes

**Step 3 — model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight**

* runtime effect (yes):

  ```json
  [{"id":"decibel.max","source":"model"},{"id":"illuminance.avg","source":"model"},{"id":"comfort-level","source":"local"}]
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"kpiTypeAtO1":null,"commit":200,"o1":null,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: -- ms · step passed: yes

**Step 4 — unplug dev2 ambient (used by nothing)**

* runtime effect (yes):

  ```json
  {"dev2_illuminance":{"sensor":"dev2_illuminance","device":"dev2","fleetId":"acs2","key":"illuminance","unit":"lx","label":"Illuminance","online":false,"value":null,"observedAt":null}}
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteSensor":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 2175 ms · step passed: yes
* note: the model is cleaned by the operator, the assistant does not propose removals

**Step 5 — unplug dev2 soundPressure (one of two inputs of decibel.max)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"decibel.max","label":"decibel.max","aggregation":"max","inputs":["decibel"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_decibel","key":"decibel","on
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteInput":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 325 ms · step passed: yes

**Step 6 — unplug dev1 ambient (only input of illuminance.avg, measured by the goal)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"illuminance.avg","label":"illuminance.avg","aggregation":"avg","inputs":["illuminance"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_illuminance","ke
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"status":422,"error":"not_conforming","diagnostics":["C8.TOO_FEW","P5.NO_INPUTS","P6.GOAL_OUT_OF_SCOPE"],"versionUnchanged":true}
  ```
* M4: 2681 ms · step passed: yes
* note: the commit is blocked: the indicator would lose its inputs and the goal become unevaluable

**Step 7 — replace the controller of dev2 (new X-Device-Id)**

* runtime effect (yes):

  ```json
  {"spaceWhileUnmapped":null,"mappedAgain":"room_b"}
  ```
* proposal (yes): `A1:DEVICE_UNMODELLED`
* commit (yes):

  ```json
  {"rebind":{"target":"O0","status":200,"version":9},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 9036 ms · step passed: yes

**Step 8 — re-plug dev2 ambient, then unplug it before accepting the proposal**

* runtime effect (yes):

  ```json
  {"proposalWhilePlugged":["A2:SENSOR_UNMODELLED"],"proposalAfter":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED →`
* commit (--):

  ```json
  --
  ```
* M4: 1036 ms · step passed: yes
* note: nothing was committed

#### home — simulation (`rq2-2026-09-23`)

**Step 1 — plug ambient (illuminance) on dev1**

* runtime effect (yes):

  ```json
  {"keyObserved":true,"modelledBefore":[]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[co2] B2:SENSOR_TYPE_MISSING[temperature] B2:SENSOR_TYPE_MISSING[humidity] B2:SENSOR_TYPE_MISSING[illuminance] B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"typesAtO1":[{"key":"co2","target":"O1","status":200,"version":2},{"key":"temperature","target":"O1","status":200,"version":3},{"key":"humidity","target":"O1","status":200,"version":4},{"key":"illumi
  ```
* M4: 1367 ms · step passed: yes

**Step 2 — plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2**

* runtime effect (yes):

  ```json
  {"keysObserved":["decibel"]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[decibel] B3:KPI_TYPE_MISSING A2:SENSOR_UNMODELLED (2 sensors on dev2)`
* commit (yes):

  ```json
  {"typeAtO1":{"target":"O1","status":200,"version":6},"sensorsAtO0":[{"sensors":["dev1_decibel"],"target":"O0","status":200,"version":9},{"target":"O0","status":200,"version":10}],"conformance":{"error
  ```
* M4: 1529 ms · step passed: yes

**Step 3 — model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight**

* runtime effect (yes):

  ```json
  [{"id":"decibel.max","source":"model"},{"id":"illuminance.avg","source":"model"},{"id":"comfort-level","source":"local"}]
  ```
* proposal (yes): `B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"kpiTypeAtO1":{"target":"O1","status":200,"version":7},"commit":200,"o1":{"status":200,"version":8},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: -- ms · step passed: yes

**Step 4 — unplug dev2 ambient (used by nothing)**

* runtime effect (yes):

  ```json
  {"dev2_illuminance":{"sensor":"dev2_illuminance","device":"dev2","fleetId":"acs2","key":"illuminance","unit":"lx","label":"Illuminance","online":false,"value":null,"observedAt":null}}
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteSensor":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 1547 ms · step passed: yes
* note: the model is cleaned by the operator, the assistant does not propose removals

**Step 5 — unplug dev2 soundPressure (one of two inputs of decibel.max)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"decibel.max","label":"decibel.max","aggregation":"max","inputs":["decibel"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_decibel","key":"decibel","on
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteInput":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 2654 ms · step passed: yes

**Step 6 — unplug dev1 ambient (only input of illuminance.avg, measured by the goal)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"illuminance.avg","label":"illuminance.avg","aggregation":"avg","inputs":["illuminance"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_illuminance","ke
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"status":422,"error":"not_conforming","diagnostics":["C8.TOO_FEW","P5.NO_INPUTS","P6.GOAL_OUT_OF_SCOPE"],"versionUnchanged":true}
  ```
* M4: 2348 ms · step passed: yes
* note: the commit is blocked: the indicator would lose its inputs and the goal become unevaluable

**Step 7 — replace the controller of dev2 (new X-Device-Id)**

* runtime effect (yes):

  ```json
  {"spaceWhileUnmapped":null,"mappedAgain":"room_b"}
  ```
* proposal (yes): `A1:DEVICE_UNMODELLED`
* commit (yes):

  ```json
  {"rebind":{"target":"O0","status":200,"version":16},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 9073 ms · step passed: yes

**Step 8 — re-plug dev2 ambient, then unplug it before accepting the proposal**

* runtime effect (yes):

  ```json
  {"proposalWhilePlugged":["A2:SENSOR_UNMODELLED"],"proposalAfter":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED →`
* commit (--):

  ```json
  --
  ```
* M4: 1717 ms · step passed: yes
* note: nothing was committed

#### fitness — simulation (`rq2-2026-09-23`)

**Step 1 — plug ambient (illuminance) on dev1**

* runtime effect (yes):

  ```json
  {"keyObserved":true,"modelledBefore":[]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[co2] B2:SENSOR_TYPE_MISSING[temperature] B2:SENSOR_TYPE_MISSING[humidity] B2:SENSOR_TYPE_MISSING[illuminance] B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"typesAtO1":[{"key":"co2","target":"O1","status":200,"version":2},{"key":"temperature","target":"O1","status":200,"version":3},{"key":"humidity","target":"O1","status":200,"version":4},{"key":"illumi
  ```
* M4: 1766 ms · step passed: yes

**Step 2 — plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2**

* runtime effect (yes):

  ```json
  {"keysObserved":["decibel"]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[decibel] B3:KPI_TYPE_MISSING A2:SENSOR_UNMODELLED (2 sensors on dev2)`
* commit (yes):

  ```json
  {"typeAtO1":{"target":"O1","status":200,"version":6},"sensorsAtO0":[{"sensors":["dev1_decibel"],"target":"O0","status":200,"version":9},{"target":"O0","status":200,"version":10}],"conformance":{"error
  ```
* M4: 2251 ms · step passed: yes

**Step 3 — model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight**

* runtime effect (yes):

  ```json
  [{"id":"decibel.max","source":"model"},{"id":"illuminance.avg","source":"model"},{"id":"comfort-level","source":"local"}]
  ```
* proposal (yes): `B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"kpiTypeAtO1":{"target":"O1","status":200,"version":7},"commit":200,"o1":null,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: -- ms · step passed: yes

**Step 4 — unplug dev2 ambient (used by nothing)**

* runtime effect (yes):

  ```json
  {"dev2_illuminance":{"sensor":"dev2_illuminance","device":"dev2","fleetId":"acs2","key":"illuminance","unit":"lx","label":"Illuminance","online":false,"value":null,"observedAt":null}}
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteSensor":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 1093 ms · step passed: yes
* note: the model is cleaned by the operator, the assistant does not propose removals

**Step 5 — unplug dev2 soundPressure (one of two inputs of decibel.max)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"decibel.max","label":"decibel.max","aggregation":"max","inputs":["decibel"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_decibel","key":"decibel","on
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteInput":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 2155 ms · step passed: yes

**Step 6 — unplug dev1 ambient (only input of illuminance.avg, measured by the goal)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"illuminance.avg","label":"illuminance.avg","aggregation":"avg","inputs":["illuminance"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_illuminance","ke
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"status":422,"error":"not_conforming","diagnostics":["C8.TOO_FEW","P5.NO_INPUTS","P6.GOAL_OUT_OF_SCOPE"],"versionUnchanged":true}
  ```
* M4: 1634 ms · step passed: yes
* note: the commit is blocked: the indicator would lose its inputs and the goal become unevaluable

**Step 7 — replace the controller of dev2 (new X-Device-Id)**

* runtime effect (yes):

  ```json
  {"spaceWhileUnmapped":null,"mappedAgain":"room_b"}
  ```
* proposal (yes): `A1:DEVICE_UNMODELLED`
* commit (yes):

  ```json
  {"rebind":{"target":"O0","status":200,"version":15},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 6404 ms · step passed: yes

**Step 8 — re-plug dev2 ambient, then unplug it before accepting the proposal**

* runtime effect (yes):

  ```json
  {"proposalWhilePlugged":["A2:SENSOR_UNMODELLED"],"proposalAfter":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED →`
* commit (--):

  ```json
  --
  ```
* M4: 1223 ms · step passed: yes
* note: nothing was committed

#### office — physical (`hw-2026-09-24`)

**Step 1 — plug ambient (illuminance) on dev1**

* runtime effect (yes):

  ```json
  {"keyObserved":true,"modelledBefore":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED`
* commit (yes):

  ```json
  {"sensorAtO0":{"sensors":["dev1_illuminance"],"target":"O0","status":200,"version":2},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 151 ms · step passed: yes

**Step 2 — plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2**

* runtime effect (yes):

  ```json
  {"keysObserved":["decibel"]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[decibel] A2:SENSOR_UNMODELLED (2 sensors on dev2)`
* commit (yes):

  ```json
  {"typeAtO1":{"target":"O1","status":200,"version":2},"sensorsAtO0":[{"sensors":["dev1_decibel"],"target":"O0","status":200,"version":4},{"target":"O0","status":200,"version":5}],"conformance":{"errors
  ```
* M4: 136 ms · step passed: yes

**Step 3 — model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight**

* runtime effect (yes):

  ```json
  [{"id":"decibel.max","source":"model"},{"id":"illuminance.avg","source":"model"},{"id":"comfort-level","source":"local"}]
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"kpiTypeAtO1":null,"commit":200,"o1":null,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: -- ms · step passed: yes

**Step 4 — unplug dev2 ambient (used by nothing)**

* runtime effect (yes):

  ```json
  {"dev2_illuminance":{"sensor":"dev2_illuminance","device":"dev2","fleetId":"acs2","key":"illuminance","unit":"lx","label":"Illuminance","online":false,"value":null,"observedAt":null}}
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteSensor":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 2608 ms · step passed: yes
* note: the model is cleaned by the operator, the assistant does not propose removals

**Step 5 — unplug dev2 soundPressure (one of two inputs of decibel.max)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"decibel.max","label":"decibel.max","aggregation":"max","inputs":["decibel"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_decibel","key":"decibel","on
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteInput":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 3572 ms · step passed: yes

**Step 6 — unplug dev1 ambient (only input of illuminance.avg, measured by the goal)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"illuminance.avg","label":"illuminance.avg","aggregation":"avg","inputs":["illuminance"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_illuminance","ke
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"status":422,"error":"not_conforming","diagnostics":["C8.TOO_FEW","P5.NO_INPUTS","P6.GOAL_OUT_OF_SCOPE"],"versionUnchanged":true}
  ```
* M4: 5984 ms · step passed: yes
* note: the commit is blocked: the indicator would lose its inputs and the goal become unevaluable

**Step 7 — replace the controller of dev2 (new X-Device-Id)**

* runtime effect (yes):

  ```json
  {"spaceWhileUnmapped":null,"mappedAgain":"room_b"}
  ```
* proposal (yes): `A1:DEVICE_UNMODELLED`
* commit (yes):

  ```json
  {"rebind":{"target":"O0","status":200,"version":9},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 20104 ms · step passed: yes

**Step 8 — re-plug dev2 ambient, then unplug it before accepting the proposal**

* runtime effect (yes):

  ```json
  {"proposalWhilePlugged":["A2:SENSOR_UNMODELLED"],"proposalAfter":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED →`
* commit (--):

  ```json
  --
  ```
* M4: 148 ms · step passed: yes
* note: nothing was committed

#### home — physical (`hw-2026-09-24`)

**Step 1 — plug ambient (illuminance) on dev1**

* runtime effect (yes):

  ```json
  {"keyObserved":true,"modelledBefore":[]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[co2] B2:SENSOR_TYPE_MISSING[temperature] B2:SENSOR_TYPE_MISSING[humidity] B2:SENSOR_TYPE_MISSING[illuminance] B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"typesAtO1":[{"key":"co2","target":"O1","status":200,"version":2},{"key":"temperature","target":"O1","status":200,"version":3},{"key":"humidity","target":"O1","status":200,"version":4},{"key":"illumi
  ```
* M4: 5712 ms · step passed: yes

**Step 2 — plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2**

* runtime effect (yes):

  ```json
  {"keysObserved":["decibel"]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[decibel] B3:KPI_TYPE_MISSING A2:SENSOR_UNMODELLED (2 sensors on dev2)`
* commit (yes):

  ```json
  {"typeAtO1":{"target":"O1","status":200,"version":6},"sensorsAtO0":[{"sensors":["dev1_decibel"],"target":"O0","status":200,"version":9},{"target":"O0","status":200,"version":10}],"conformance":{"error
  ```
* M4: 3837 ms · step passed: yes

**Step 3 — model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight**

* runtime effect (yes):

  ```json
  [{"id":"decibel.max","source":"model"},{"id":"illuminance.avg","source":"model"},{"id":"comfort-level","source":"local"}]
  ```
* proposal (yes): `B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"kpiTypeAtO1":{"target":"O1","status":200,"version":7},"commit":200,"o1":{"status":200,"version":8},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: -- ms · step passed: yes

**Step 4 — unplug dev2 ambient (used by nothing)**

* runtime effect (yes):

  ```json
  {"dev2_illuminance":{"sensor":"dev2_illuminance","device":"dev2","fleetId":"acs2","key":"illuminance","unit":"lx","label":"Illuminance","online":false,"value":null,"observedAt":null}}
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteSensor":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 2341 ms · step passed: yes
* note: the model is cleaned by the operator, the assistant does not propose removals

**Step 5 — unplug dev2 soundPressure (one of two inputs of decibel.max)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"decibel.max","label":"decibel.max","aggregation":"max","inputs":["decibel"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_decibel","key":"decibel","on
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteInput":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 3071 ms · step passed: yes

**Step 6 — unplug dev1 ambient (only input of illuminance.avg, measured by the goal)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"illuminance.avg","label":"illuminance.avg","aggregation":"avg","inputs":["illuminance"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_illuminance","ke
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"status":422,"error":"not_conforming","diagnostics":["C8.TOO_FEW","P5.NO_INPUTS","P6.GOAL_OUT_OF_SCOPE"],"versionUnchanged":true}
  ```
* M4: 6180 ms · step passed: yes
* note: the commit is blocked: the indicator would lose its inputs and the goal become unevaluable

**Step 7 — replace the controller of dev2 (new X-Device-Id)**

* runtime effect (yes):

  ```json
  {"spaceWhileUnmapped":null,"mappedAgain":"room_b"}
  ```
* proposal (yes): `A1:DEVICE_UNMODELLED`
* commit (yes):

  ```json
  {"rebind":{"target":"O0","status":200,"version":16},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 14681 ms · step passed: yes

**Step 8 — re-plug dev2 ambient, then unplug it before accepting the proposal**

* runtime effect (yes):

  ```json
  {"proposalWhilePlugged":["A2:SENSOR_UNMODELLED"],"proposalAfter":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED →`
* commit (--):

  ```json
  --
  ```
* M4: 25066 ms · step passed: yes
* note: nothing was committed

#### fitness — physical (`hw-2026-09-24`)

**Step 1 — plug ambient (illuminance) on dev1**

* runtime effect (yes):

  ```json
  {"keyObserved":true,"modelledBefore":[]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[co2] B2:SENSOR_TYPE_MISSING[temperature] B2:SENSOR_TYPE_MISSING[humidity] B2:SENSOR_TYPE_MISSING[illuminance] B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"typesAtO1":[{"key":"co2","target":"O1","status":200,"version":2},{"key":"temperature","target":"O1","status":200,"version":3},{"key":"humidity","target":"O1","status":200,"version":4},{"key":"illumi
  ```
* M4: 730 ms · step passed: yes

**Step 2 — plug soundPressure (decibel, untyped) on dev1; then both bricklets on dev2**

* runtime effect (yes):

  ```json
  {"keysObserved":["decibel"]}
  ```
* proposal (yes): `A4:TYPES_MISSING_ABOVE B2:SENSOR_TYPE_MISSING[decibel] B3:KPI_TYPE_MISSING A2:SENSOR_UNMODELLED (2 sensors on dev2)`
* commit (yes):

  ```json
  {"typeAtO1":{"target":"O1","status":200,"version":6},"sensorsAtO0":[{"sensors":["dev1_decibel"],"target":"O0","status":200,"version":9},{"target":"O0","status":200,"version":10}],"conformance":{"error
  ```
* M4: 5030 ms · step passed: yes

**Step 3 — model decibel.max (dev1+dev2), illuminance.avg (dev1) and the goal roomLight**

* runtime effect (yes):

  ```json
  [{"id":"decibel.max","source":"model"},{"id":"illuminance.avg","source":"model"},{"id":"comfort-level","source":"local"}]
  ```
* proposal (yes): `B3:KPI_TYPE_MISSING`
* commit (yes):

  ```json
  {"kpiTypeAtO1":{"target":"O1","status":200,"version":7},"commit":200,"o1":null,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: -- ms · step passed: yes

**Step 4 — unplug dev2 ambient (used by nothing)**

* runtime effect (yes):

  ```json
  {"dev2_illuminance":{"sensor":"dev2_illuminance","device":"dev2","fleetId":"acs2","key":"illuminance","unit":"lx","label":"Illuminance","online":false,"value":null,"observedAt":null}}
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteSensor":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 5103 ms · step passed: yes
* note: the model is cleaned by the operator, the assistant does not propose removals

**Step 5 — unplug dev2 soundPressure (one of two inputs of decibel.max)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"decibel.max","label":"decibel.max","aggregation":"max","inputs":["decibel"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_decibel","key":"decibel","on
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"deleteInput":200,"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 57710 ms · step passed: yes

**Step 6 — unplug dev1 ambient (only input of illuminance.avg, measured by the goal)**

* runtime effect (yes):

  ```json
  {"disabled":{"id":"illuminance.avg","label":"illuminance.avg","aggregation":"avg","inputs":["illuminance"],"source":"model","sensors":[{"fleetId":"acs1","device":"dev1","sensor":"dev1_illuminance","ke
  ```
* proposal (yes): `--`
* commit (yes):

  ```json
  {"status":422,"error":"not_conforming","diagnostics":["C8.TOO_FEW","P5.NO_INPUTS","P6.GOAL_OUT_OF_SCOPE"],"versionUnchanged":true}
  ```
* M4: 6539 ms · step passed: yes
* note: the commit is blocked: the indicator would lose its inputs and the goal become unevaluable

**Step 7 — replace the controller of dev2 (new X-Device-Id)**

* runtime effect (yes):

  ```json
  {"spaceWhileUnmapped":null,"mappedAgain":"room_b"}
  ```
* proposal (yes): `A1:DEVICE_UNMODELLED`
* commit (yes):

  ```json
  {"rebind":{"target":"O0","status":200,"version":15},"conformance":{"errors":[],"warnings":[],"projects":true}}
  ```
* M4: 13064 ms · step passed: yes

**Step 8 — re-plug dev2 ambient, then unplug it before accepting the proposal**

* runtime effect (yes):

  ```json
  {"proposalWhilePlugged":["A2:SENSOR_UNMODELLED"],"proposalAfter":[]}
  ```
* proposal (yes): `A2:SENSOR_UNMODELLED →`
* commit (--):

  ```json
  --
  ```
* M4: 10730 ms · step passed: yes
* note: nothing was committed

## Provenance

Generated from the evaluation workbook used during the runs. Every value is
reproduced from it without recomputation, except the derived summaries, which are
computed from the rows in this file.
