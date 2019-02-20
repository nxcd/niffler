<div style='width: 100%; text-align: center;'>
  <img style='margin: 0 auto;' src='./assets/logo.png'/>
</div>
<br/>
<br/>

# Niffler

> A minio based microservice to multi-cloud storage

Niffler is a microservice, that provides endpoints to files management, it is necessary to give you a storage and, through minio, make it multi-cloud compatible.

## Usage

### Run with docker-compose

```shell
$ docker-compose up
```

That`s will run a minio container and a niffler container

Here, the niffler behaviour it's use a local single storage on minio container.

### Run the service

1. Install the dependecies

```shell
$ pnpm i
```

```shell
$ npm i
```

2. Build

```shell
$ npm run build
```

2. Run

```shell
$ npm start
```

To access some storage services is necessary give you credentials, in the .envrc.sample is a sample of the supported environment config:

```shell
$ export STORAGE_SIGNEDURL_TTL="3600"
$ export STORAGE_MAX_UPLOAD_SIZE="5242880"
$ export STORAGE_BUCKET="fontes-storage-development"
$ export STORAGE_ENDPOINT="http://minio.127.0.0.1.nip.io"
$ export STORAGE_CREDENTIALS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
$ export STORAGE_CREDENTIALS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```

To access S3 service, is not necessary gives a a `STORAGE_ENDPOINT`:

```shell
$ export STORAGE_ENDPOINT=""
```

### Endpoints

Niffler provides endpoints to communicates with storage server

#### POST /

##### Request
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg?style=flat-square)

formData:
```json
{
  "file": "ARQUIVO.img"
}
```

headers:
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

##### Response

body:
```json
{
  "id": "e7f01c90-3541-11e9-9067-b18bebbbc6cc"
}
```

### GET /:fileId
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg?style=flat-square)

##### Response
```json
{
    "id": "e7f01c90-3541-11e9-9067-b18bebbbc6cc",
    "name": "BASE_PAN_ACCENT_Test (1).csv",
    "enconding": "7bit",
    "signedUrl": "https://s3.amazonaws.com/fontes-storage-development/e7f01c90-3541-11e9-9067-b18bebbbc6cc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIPPNA2FFYMMOE2JA%2F20190220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190220T191942Z&X-Amz-Expires=3600&X-Amz-Signature=d0b936966df8ba2be16ba6ec7866195783be2a14a9622195cd6396557eb53d90&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%20%3D%22BASE_PAN_ACCENT_Test%20%281%29.csv%22",
    "mimetype": "text/csv",
    "size": 151180,
    "createdAt": "2019-02-20T19:01:26.000Z"
}
```
