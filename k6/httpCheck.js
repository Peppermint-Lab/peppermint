import http from 'k6/http';
import {check, sleep} from 'k6';


export let options = {
    vus: 1000,
    duration: '3s'
}

export default function() {
    let res = http.get('http://localhost:3000')
    check(res, {
        'is status 200': (r) => r.status === 200
    });
}