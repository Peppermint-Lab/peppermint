import http from 'k6/http';
import {check, sleep} from 'k6';

export default function() {
  const data = {email: 'admin@admin.com', password: '12345'};
  let res = http.post('http://localhost:3000/login', data);
    check(res, { 'success login': (r) => r.status === 200 });
    sleep(0.3);
}
