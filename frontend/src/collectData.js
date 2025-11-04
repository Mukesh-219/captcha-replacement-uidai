export default function collectPassiveFeatures(){
const nav = window.navigator || {};
const screenObj = window.screen || {};
const ua_token_count = (nav.userAgent || '').split(/\s+/).length;
return {
ua_token_count,
screen_w: screenObj.width || 0,
screen_h: screenObj.height || 0,
tz_offset: new Date().getTimezoneOffset() / 60.0,
languages_count: nav.languages?.length || 0,
plugins_len: nav.plugins?.length || 0,
max_touch_points: nav.maxTouchPoints || 0,
hardware_concurrency: nav.hardwareConcurrency || 0,
device_memory_gb: nav.deviceMemory || 0,
webdriver_flag: nav.webdriver ? 1 : 0,
};
}
