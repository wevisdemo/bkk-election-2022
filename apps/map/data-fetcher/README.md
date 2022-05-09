# `Map` Data Fetcher
This app creates json files (possibly `CandidateMap` and `ElectionData`) for map project.

## Structure
As the day this app is developed, there is a possiblity to switch to more stable source of infomation.

Thus, the concept of designing this app is to make the app most flexible to plug with other sources. This can be simplified to:
- `fetcher.ts` is a definition of interfaces for any source.
- Directory seperates APIs, one per each source.
  - `ers` is an API for Election Result System provided by VIVE
- Other files in root are general business logics that apply to every sources.
- `index.ts` orchestrates which source shall be used for any command.

## Docker
The data-fetcher can be run via Docker. The provided `../Dockerfile.data-fetcher` with `../` context should be used.

### Build Image
```
docker build -t <IMAGE_NAME>:<IMAGE_TAG> -f Dockerfile.data-fetcher .
```

### Run Image
```
docker run -m $PWD/output:/app/output -e ERS_API_KEY=<VALUE> <IMAGE_NAME>:<IMAGE_TAG>
```
### Output
- WORKDIR is at `/app`.
- Output directory is designated at `/app/output`.
### Env
Environment key-values can be provided using:
- Docker env
- Mounting `.env` file at WORKDIR (`/app`)

|Key        |Description                                   |
|-----------|----------------------------------------------|
|ERS_API_KEY|API key to fetch dat from ERS provided by VIVE|