import { aggregate, sessionize } from '../../../../active-window-sessions/dist/index.js';

const t0 = Date.parse('2026-03-02T09:00:00Z');
const at = (seconds, window, idleSeconds) => ({ at: t0 + seconds * 1000, window, idleSeconds });

const code = { app: 'Code', appId: 'com.microsoft.VSCode' };
const chrome = (url) => ({ app: 'Google Chrome', appId: 'com.google.Chrome', url });
const alert = { app: 'UserNotificationCenter', appId: 'com.apple.UserNotificationCenter' };

const samples = [
  at(0, code),
  at(2, code),
  at(4, code),
  at(6, code),
  at(8, chrome('https://github.com/acme/app/pulls')),
  at(10, chrome('https://github.com/acme/app/pulls')),
  at(12, alert), // a system alert flashes in front: ignored
  at(14, chrome('https://github.com/acme/app/issues')),
  at(15, code), // half a second back in the editor: a blip
  at(15.5, chrome('https://github.com/acme/app/issues')),
  at(19, chrome('https://github.com/acme/app/issues'), 0),
  at(70, chrome('https://github.com/acme/app/issues'), 51), // idle for 51 s: the last input was at 19 s
];

const segments = sessionize(samples);
console.log(segments);
console.log(aggregate(segments, { by: 'host' }));
