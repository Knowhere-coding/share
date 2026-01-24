# `useCache` Hook

A custom hook that provides in-memory caching with automatic expiration and capacity management. It supports simple key-value caching with a TTL (Time To Live) and a capacity limit for stored entries.

## Type Parameters:

- `K`: The type of the key for the cache (converted to string when storing in cache map).
- `V`: The type of the value to be cached (e.g., `string`, `number`, `object`).

## Parameters:

- `config` (optional): Configuration for the cache behavior.
  - `ttlMs` (optional, default: `300000` (5 minutes)): The time-to-live (TTL) for cached entries, in milliseconds. After this time, the entry will expire.
  - `capacity` (optional, default: `100`): The maximum number of entries to store in the cache. When the limit is exceeded, the least recently expired item is evicted.

## Returns:

- An object with two methods:
  - `get(key: K): V | undefined`: Retrieves the cached value for the provided key. If the entry does not exist or has expired, it returns `undefined`.
  - `set(key: K, value: V): void`: Stores the given value in the cache with the specified key.

## Example Usage:

```tsx
const MyComponent = () => {
    const cache = useCache<string, string>({
        ttlMs: 10 * 60 * 1000, // 10 minutes TTL
        capacity: 50, // maximum 50 cache entries
    });

    // Store value in the cache
    cache.set('myKey', 'some value');

    // Retrieve value from the cache
    const cachedValue = cache.get('myKey');
    if (cachedValue) {
        console.log(cachedValue); // Output: 'some value'
    }
};
```

## Internal Methods (for developers maintaining the hook):

- `now()`: Returns the current timestamp in milliseconds.
- `isExpired(entry: CacheEntry<V>): boolean`: Checks if a cache entry has expired based on the TTL.
- `getCacheKey(key: K): string`: Serializes the cache key into a string. This is important for handling complex keys, such as objects. (Consider using a stable stringify function to handle key serialization properly.)
- `getCacheEntry(value: V): CacheEntry<V>`: Creates a new cache entry with the current time plus the TTL.
- `pruneExpiredEntries()`: Removes expired entries from the cache.
- `evictEntryIfOverCapacity()`: Removes the least recently expired entry if the cache size exceeds the configured capacity.

## Notes:

**TTL**: Cached entries are removed automatically after they expire. You can configure this TTL for better performance or memory management.

**Capacity**: The cache evicts the least recently expired entries when the cache size exceeds the configured capacity. This helps prevent memory bloat when storing many entries.

## Additional Notes for Developers:

The `getCacheKey` method uses `JSON.stringify()` to serialize the cache key. This may lead to issues with key order in complex objects. Consider using a stable stringification method for complex objects or improving this logic in future updates.
