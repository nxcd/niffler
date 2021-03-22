![Logo](assets/logo.png?raw=true) ![Text](assets/nifflerText.png?raw=true)

> A minio based microservice to multi-cloud storage

Niffler is a microservice that provides endpoints to manage files; it uses minio to provide a multi-cloud compatible storage solution.

## Usage

### Run with docker-compose

```shell
$ docker-compose up
```

This will run a minio container and a niffler container

Here, the default niffler behaviour is to use a local single storage on minio container.

### Run the service

1. Install the dependecies

```shell
$ pnpm i
```
> OR
```shell
$ npm i
```

2. Build

```shell
$ npm run build
```

3. Run

```shell
$ npm start
```

Credentials are necessary to access some cloud services; the .envrc.sample file is a sample of the supported environment variables:

```shell
$ export STORAGE_SIGNEDURL_TTL="3600"
$ export STORAGE_MAX_UPLOAD_SIZE="5242880"
$ export STORAGE_BUCKET="storage-development"
$ export STORAGE_ENDPOINT="http://minio.127.0.0.1.nip.io"
$ export STORAGE_CREDENTIALS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
$ export STORAGE_CREDENTIALS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```

> When using Amazon S3, suppress the `STORAGE_ENDPOINT` environment variable

### Endpoints

Niffler provides endpoints to communicate with the storage server

#### POST /
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg?style=flat-square)

##### Request

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
  "data": {
    "id": "e7f01c90-3541-11e9-9067-b18bebbbc6cc",
    "name": "ARQUIVO.img",
    "encoding": "7bit",
    "signedUrl": "https://s3.amazonaws.com/storage-development/e7f01c90-3541-11e9-9067-b18bebbbc6cc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIPPNA2FFYMMOE2JA%2F20190220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190220T191942Z&X-Amz-Expires=3600&X-Amz-Signature=d0b936966df8ba2be16ba6ec7866195783be2a14a9622195cd6396557eb53d90&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%20%3D%22ARQUIVOt%20%281%29.pan%22",
    "mimetype": "text/csv",
    "size": 151180,
    "createdAt": "2019-02-20T19:01:26.000Z"
  }
}
```
