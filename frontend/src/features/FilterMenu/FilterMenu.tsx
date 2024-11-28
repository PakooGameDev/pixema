import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './FilterMenu.module.scss';
import {Input,Switcher,DoubleInput,Selector,TagSelector} from '../../shared/ui/index';

import { movieStore } from '../../entities/Movie/Model/MovieStore'; 

interface FilterMenuProps { 
    isOpen?: boolean; 
    onClose?: () => void; 
}

const FilterMenu: React.FC<FilterMenuProps> = observer(({ isOpen = true, onClose }) => {
    const [movie, setMovie] = useState('');
    const [country, setCountry] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [years, setYears] = useState<[string | null, string | null]>([null, null]);
    const [ratings, setRatings] = useState<[string | null, string | null]>([null, null]);
    const [sortBy, setSortBy] = useState('rating');

    const handleShowResults = () => {
        movieStore.setFilters({
            title: movie,
            genre: genre.join('|'), 
            country,
            years,
            ratings,
            sortBy, 
        });
        onClose && onClose();
    };

    const handleClear = () => {
        movieStore.setFilters({
            title: '',
            genre:[], 
            country:'',
            years:[null, null],
            ratings: [null, null],
            sortBy:'none', 
        });
        onClose && onClose(); 
    };
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo-Brazzaville",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine State",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];
    return (
        <div className={`${styles.filter} ${isOpen ? `${styles.open}` : ''}`}>
            <div className={styles.filter__container}>
                <div className={styles.filter__container_header}>
                    <h2>Filters</h2>
                    <button className={styles.filter__container_close} onClick={onClose}>✖</button>
                </div>
                <Switcher 
                    className={styles.filter__container_sort} 
                    label='Sort by' 
                    buttons={[
                        { value: 'rating', label: 'Rating' }, 
                        { value: 'years', label: 'Years' }
                    ]} 
                    activeButton={sortBy} 
                    onChange={setSortBy}
                />
                <div className={styles.filter__container_fields}>
                    <Input placeholder="Your text" className={styles.filter__container_search} label="Full or short movie name" type="text" value={movie} onChange={(e) => setMovie(e.target.value)} />
                    <Selector label='Country' value={country} selections={countries} onChange={setCountry} />
                    <TagSelector label='Genre' initialTags={genre} onChange={setGenre} />
                    <DoubleInput 
                        label='Years'
                        placeholders={{ first: 'From', second: 'To' }} 
                        types={{ first: 'number', second: 'number' }}
                        value={years}
                        onChange={(from, to) => setYears([from, to])}
                    />
                    <DoubleInput 
                        label='Rating'
                        placeholders={{ first: 'From', second: 'To' }} 
                        types={{ first: 'number', second: 'number' }}
                        value={ratings}
                        onChange={(from, to) => setRatings([from, to])}
                    />
                </div>
                <div className={styles.filter__buttons}>
                    <button className={styles.filter__buttons_btn} onClick={handleClear}>Clear filter</button>
                    <button className={styles.filter__buttons_btn} onClick={handleShowResults}>Show results</button>
                </div>
            </div>
        </div>
    );
});

export default FilterMenu;
