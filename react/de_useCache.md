````tsx
/**
 * Benutzerdefinierter Hook zur Verwaltung von Caching im Arbeitsspeicher mit TTL (Time-to-Live) und Kapazitaetsmanagement.
 *
 * Bietet die Methoden `get`, `set` und `clear`, um Werte im Cache zu speichern, auszulesen oder zu loeschen. Unterstuetzt das automatische Entfernen abgelaufener
 * Eintraege und die kapazitaetsbasierte Eviktion (am wenigsten kuerzlich abgelaufene Eintraege), wenn der Cache seine Grenze ueberschreitet.
 *
 * @param {UseCacheConfig} config - Optionale Konfiguration, um TTL und Cache-Kapazitaet anzupassen.
 *   - ttlMs: Time-to-Live fuer Cache-Eintraege in Millisekunden (Standard ist 5 Minuten).
 *   - capacity: Maximale Anzahl von Eintraegen, die im Cache gespeichert werden koennen (Standard ist 100).
 *
 * @returns {Cache<K, V>} Ein Objekt mit den Methoden `get`, `set`, `clear`, um mit dem Cache zu interagieren.
 *   - `get(key: K): V | undefined`: Ruft den zwischengespeicherten Wert für den angegebenen Schlüssel ab. Wenn der Eintrag nicht existiert oder abgelaufen ist, wird `undefined` zurückgegeben.
 *   - `set(key: K, value: V): void`: Speichert den angegebenen Wert im Cache mit dem angegebenen Schlüssel.
 *   - `clear(): void`: Loescht alle Eintraege im Cache.
 *
 * @usage
 * ```tsx
 * const cache = useCache<string, string>();
 * cache.set('key', 'value');
 * cache.get('key', 'value');
 * cache.clear();
 * ```
 */
````

# `useCache` Hook

Ein benutzerdefinierter Hook, der Caching im Arbeitsspeicher mit automatischer Ablaufzeit und Kapazitätsverwaltung bietet. Er unterstützt einfaches Schlüssel-Wert-Caching mit einer TTL (Time To Live) und einer Kapazitätsgrenze für gespeicherte Einträge.

## Typ-Parameter:

- `K`: Der Typ des Schlüssels für das Cache (wird beim Speichern in der Cache-Map in einen String konvertiert).
- `V`: Der Typ des Werts, der im Cache gespeichert wird (z. B. `string`, `number`, `object`).

## Parameter:

- `config` (optional): Konfiguration für das Verhalten des Caches.
    - `ttlMs` (optional, Standard: `300000` (5 Minuten)): Die Time-to-Live (TTL) für die zwischengespeicherten Einträge in Millisekunden. Nach dieser Zeit verfällt der Eintrag.
    - `capacity` (optional, Standard: `100`): Die maximale Anzahl der Einträge, die im Cache gespeichert werden. Wenn das Limit überschritten wird, wird das am wenigsten kürzlich abgelaufene Element entfernt.

## Rückgabewert:

- Ein Objekt mit drei Methoden:
    - `get(key: K): V | undefined`: Ruft den zwischengespeicherten Wert für den angegebenen Schlüssel ab. Wenn der Eintrag nicht existiert oder abgelaufen ist, wird `undefined` zurückgegeben.
    - `set(key: K, value: V): void`: Speichert den angegebenen Wert im Cache mit dem angegebenen Schlüssel.
    - `clear(): void`: Löscht alle Eintraege im Cache.

## Beispielnutzung:

```tsx
const MyComponent = () => {
    const cache = useCache<string, string>({
        ttlMs: 10 * 60 * 1000, // 10 Minuten TTL
        capacity: 50, // maximal 50 Cache-Einträge
    });

    // Wert im Cache speichern
    cache.set('key', 'value');

    // Wert aus dem Cache abrufen
    let cachedValue = cache.get('key');
    if (cachedValue) {
        console.log(cachedValue); // Ausgabe: 'value'
    }

    // Werte aus dem Cache löschen
    cache.clear();
    cachedValue = cache.get('key');
    console.log(Boolean(cachedValue)); // Ausgabe: false
};
```

## Interne Methoden (für Entwickler, die den Hook pflegen):

- `now()`: Gibt den aktuellen Zeitstempel in Millisekunden zurück.
- `isExpired(entry: CacheEntry<V>): boolean`: Prüft, ob ein Cache-Eintrag basierend auf der TTL abgelaufen ist.
- `getCacheKey(key: K): string`: Serialisiert den Cache-Schlüssel in einen String. Dies ist wichtig, um mit komplexen Schlüsseln wie Objekten umzugehen. (Es wird empfohlen, eine stabile Stringifizierungsmethode zu verwenden, um die Schlüsselserialisierung korrekt zu handhaben.)
- `getCacheEntry(value: V): CacheEntry<V>`: Erstellt einen neuen Cache-Eintrag mit der aktuellen Zeit plus der TTL.
- `pruneExpiredEntries()`: Entfernt abgelaufene Einträge aus dem Cache.
- `evictEntryIfOverCapacity()`: Entfernt den am wenigsten kürzlich abgelaufenen Eintrag, wenn die Cache-Größe das konfigurierte Limit überschreitet.

## Hinweise:

**TTL**: Zwischengespeicherte Einträge werden automatisch entfernt, nachdem sie abgelaufen sind. Du kannst diese TTL für eine bessere Leistung oder Speicherverwaltung konfigurieren.

**Kapazität**: Der Cache entfernt die am wenigsten kürzlich abgelaufenen Einträge, wenn die Cache-Größe das konfigurierte Limit überschreitet. Dies hilft, Speicheraufblähung zu verhindern, wenn viele Einträge gespeichert werden.

## Zusätzliche Hinweise für Entwickler:

Die Methode `getCacheKey` verwendet `JSON.stringify()`, um den Cache-Schlüssel zu serialisieren. Dies kann zu Problemen mit der Reihenfolge der Schlüssel bei komplexen Objekten führen. Es wird empfohlen, eine stabile Stringifizierungsmethode für komplexe Objekte zu verwenden oder diese Logik in zukünftigen Updates zu verbessern.
