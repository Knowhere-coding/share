import {useRef} from 'react';

export interface UseCacheConfig {
  ttlMs?: number;
  capacity?: number;
}

export interface Cache<K, V> {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
}

type CacheEntry<V> = {
  value: V;
  expiresAt: number;
}

/**
 * Custom hook for managing in-memory cache with TTL (time-to-live) and capacity management.
 * 
 * Provides `get` and `set` methods to cache values. Supports automatic eviction of expired 
 * entries and capacity-based eviction (least recently expired) when the cache exceeds its limit.
 *
 * @param {UseCacheConfig} config - Optional configuration to customize TTL and cache capacity.
 *   - ttlMs: Time-to-live for cache entries in milliseconds (default is 5 minutes).
 *   - capacity: Maximum number of entries to store in the cache (default is 100).
 * 
 * @returns {Cache<K, V>} An object with `get` and `set` methods to interact with the cache.
 */
export function useCache<K, V>({
  ttlMs = 5 * 60 * 1000, // 5 minutes default TTL
  capacity = 100 // default capacity
}: UseCacheConfig = {}): Cache<K, V> {
  const cacheRef = useRef<Map<string, CacheEntry<V>>>(new Map());

  const now = (): number => Date.now();
  const isExpired = (entry: CacheEntry<V>): boolean => entry.expiresAt <= now();
  const getCacheKey = (key: K): string => JSON.stringify(key); // TODO (improvement): use stable stringify to avoid issues with key order
  const getCacheEntry = (value: V): CacheEntry<V> => {return {value, expiresAt: now() + ttlMs}};

  const pruneExpiredEntries = () => {
    const cache = cacheRef.current;
    const time = now();

    for (const [key, entry] of cache) {
      if (entry.expiresAt <= time) {
        cache.delete(key);
      }
    }
  };

  const evictEntryIfOverCapacity = () => {
    const cache = cacheRef.current;

    if (cache.size < capacity) {
      return;
    }

    let soonestKey: string | null = null;
    let soonestExpiry: number = Infinity;

    for (const [key, entry] of cache) {
      if (entry.expiresAt < soonestExpiry) {
        soonestExpiry = entry.expiresAt;
        soonestKey = key;
      }
    }

    if (soonestKey) {
      cache.delete(soonestKey);
    }
  }

  const get = (key: K): V | undefined => {
    const cache = cacheRef.current;
    const cacheKey: string = getCacheKey(key);
    const cacheEntry: CacheEntry<V> | undefined = cache.get(cacheKey);

    if (!cacheEntry) {
      return undefined;
    }

    if (isExpired(cacheEntry)) {
      cache.delete(cacheKey);
      return undefined;
    }

    return cacheEntry.value;
  };

  const set = (key: K, value: V): void => {
    pruneExpiredEntries();
    evictEntryIfOverCapacity();

    const cache = cacheRef.current;
    const cacheKey: string = getCacheKey(key);
    const cacheEntry: CacheEntry<V> = getCacheEntry(value);

    cache.set(cacheKey, cacheEntry);
  };

  return {
    get,
    set
  };
}