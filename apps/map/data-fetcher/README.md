# `Map` Data Fetcher
This app creates two json files of `CandidateMap` and `ElectionData` for map project.

## Structure
As the day this app is developed, there is a possiblity to switch to more stable source of infomation.

Thus, the concept of designing this app is to make the app most flexible to plug with other sources. This can be simplified to:
- `fetcher.ts` is a definition of interfaces for any source.
- Directory seperates APIs, one per each source.
  - `ers` is an API for Election Result System provided by VIVE
- Other files in root are general business logics that apply to every sources.
- `index.ts` orchestrates which source shall be used for any command.

## TBD
- Make `index.ts` to be configurable.