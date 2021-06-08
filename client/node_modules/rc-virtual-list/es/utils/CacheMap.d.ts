import React from 'react';
declare class CacheMap {
    maps: Record<string, number>;
    constructor();
    set(key: React.ReactText, value: number): void;
    get(key: React.ReactText): number;
}
export default CacheMap;
