export function regexFromEnv(envValue: string | undefined, fallback: RegExp): RegExp {
  
    if (!envValue) return fallback;

    let s = envValue.trim();

    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1);
    }

    const m = s.match(/^\/(.+)\/([gimsuy]*)$/);
    try {
        return m ? new RegExp(m[1], m[2]) : new RegExp(s);
    } catch (e) {
        console.warn("Invalid env regex:", s, e);
        return fallback;
    }
}