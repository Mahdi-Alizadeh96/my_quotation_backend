// <import types
import { Errback } from 'express';
// import types>

interface errorResponseData {
    message : string,
    status : number,
    data : unknown
}

type Error = Errback & errorResponseData

export default Error