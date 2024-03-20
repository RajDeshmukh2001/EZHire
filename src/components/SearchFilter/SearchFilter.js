import { ImSearch } from 'react-icons/im';
import { useEffect, useState } from 'react';
import styles from './searchFilter.module.css';
import { useFilterContext } from '@/context/FilterContext/FilterContext';

const SearchFilter = ({ filterJobs }) => {
    let { filters: { text }, updateFilterValue, clearFilters } = useFilterContext();
    const [search, setSearch] = useState(0);

    const searchOptions = [
        'Search by Job title...',
        'Search by Skills...',
        'Search by Company...',
        'Search by Location...',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSearch(prev =>
                (prev + 1) % searchOptions.length
            );
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.header}>
            <p>Showing {filterJobs?.length} results</p>

            <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        name="text"
                        value={text}
                        onChange={updateFilterValue}
                        placeholder={searchOptions[search]}
                        autoComplete="on"
                    />
                    <ImSearch className={styles.icon} />
                </div>
                <div className={styles.clearButton}>
                    <button onClick={clearFilters}>Clear All</button>
                </div>
            </form>
        </div>
    )
}

export default SearchFilter;