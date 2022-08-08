countries = ['Afghanistan', 'Angola', 'Anguilla', 'Åland Islands', 'Albania', 'Andorra', 'United Arab Emirates', 'Argentina', 'Armenia', 'American Samoa', 'French Southern Territories', 'Antigua and Barbuda', 'Australia', 'Austria', 'Azerbaijan', 'Burundi', 'Belgium', 'Benin', 'Bonaire, Sint Eustatius and Saba', 'Burkina Faso', 'Bangladesh', 'Bulgaria', 'Bahrain', 'Bahamas', 'Bosnia and Herzegovina', 'Saint Barthélemy', 'Belarus', 'Belize', 'Bermuda', 'Bolivia, Plurinational State of', 'Brazil', 'Barbados', 'Brunei Darussalam', 'Bhutan', 'Bouvet Island', 'Botswana', 'Central African Republic', 'Canada', 'Cocos (Keeling) Islands', 'Switzerland', 'Chile', 'China', "Côte d'Ivoire", 'Cameroon', 'Congo, The Democratic Republic of the', 'Congo', 'Cook Islands', 'Colombia', 'Comoros', 'Cabo Verde', 'Costa Rica', 'Cuba', 'Curaçao', 'Christmas Island', 'Cayman Islands', 'Cyprus', 'Czechia', 'Germany', 'Djibouti', 'Dominica', 'Denmark', 'Dominican Republic', 'Algeria', 'Ecuador', 'Egypt', 'Eritrea', 'Western Sahara', 'Spain', 'Estonia', 'Ethiopia', 'Finland', 'Fiji', 'Falkland Islands (Malvinas)', 'France', 'Faroe Islands', 'Micronesia, Federated States of', 'Gabon', 'United Kingdom', 'Georgia', 'Guernsey', 'Ghana', 'Gibraltar', 'Guinea', 'Guadeloupe', 'Gambia', 'Guinea-Bissau', 'Equatorial Guinea', 'Greece', 'Grenada', 'Greenland', 'Guatemala', 'French Guiana', 'Guam', 'Guyana', 'Heard Island and McDonald Islands', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Isle of Man', 'India', 'British Indian Ocean Territory', 'Ireland', 'Iran, Islamic Republic of', 'Iraq', 'Iceland', 'Israel', 'Italy', 'Jamaica', 'Jersey', 'Jordan', 'Japan', 'Kazakhstan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Saint Kitts and Nevis', 'Korea, Republic of', 'Kuwait', "Lao People's Democratic Republic", 'Lebanon', 'Liberia', 'Libya', 'Saint Lucia', 'Liechtenstein', 'Sri Lanka', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Saint Martin (French part)', 'Morocco', 'Monaco', 'Moldova, Republic of', 'Madagascar', 'Maldives', 'Mexico', 'Marshall Islands', 'North Macedonia', 'Mali', 'Malta', 'Myanmar', 'Montenegro', 'Mongolia', 'Northern Mariana Islands', 'Mozambique', 'Mauritania', 'Montserrat', 'Martinique', 'Mauritius', 'Malawi', 'Malaysia', 'Mayotte', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria', 'Nicaragua', 'Niue', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'New Zealand', 'Oman', 'Pakistan', 'Panama', 'Pitcairn', 'Peru', 'Philippines', 'Palau', 'Papua New Guinea', 'Poland', 'Puerto Rico', "Korea, Democratic People's Republic of", 'Portugal', 'Paraguay', 'Palestine, State of', 'French Polynesia', 'Qatar', 'Réunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saudi Arabia', 'Sudan', 'Senegal', 'Singapore', 'South Georgia and the South Sandwich Islands', 'Saint Helena, Ascension and Tristan da Cunha', 'Svalbard and Jan Mayen', 'Solomon Islands', 'Sierra Leone', 'El Salvador', 'San Marino', 'Somalia', 'Saint Pierre and Miquelon', 'Serbia', 'South Sudan', 'Sao Tome and Principe', 'Suriname', 'Slovakia', 'Slovenia', 'Sweden', 'Eswatini', 'Sint Maarten (Dutch part)', 'Seychelles', 'Syrian Arab Republic', 'Turks and Caicos Islands', 'Chad', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau', 'Turkmenistan', 'Timor-Leste', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Tuvalu', 'Taiwan, Province of China', 'Tanzania, United Republic of', 'Uganda', 'Ukraine', 'United States Minor Outlying Islands', 'Uruguay', 'United States', 'Uzbekistan', 'Holy See (Vatican City State)', 'Saint Vincent and the Grenadines', 'Venezuela, Bolivarian Republic of', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Viet Nam', 'Vanuatu', 'Wallis and Futuna', 'Samoa', 'Yemen', 'South Africa', 'Zambia', 'Zimbabwe']




/* Spread Operator (Shallow copy) */
let countryPool = [...countries]

let currentCountry = '';
let currentPool

const amountButtons = document.querySelector('.btn-group').children.length

/* The Random Index will be stored here so that, only temporary*/
let randomCountryIndex

function next() {
    currentPool = []

    /* Get random element from the countries list and remove it*/
    randomCountryIndex = randomChoiceIndex(countryPool)
    currentCountry = countryPool[randomCountryIndex]
    countryPool.splice(randomCountryIndex, 1)
    currentPool.push(currentCountry)

    /* Show the searched country in the img tag, by setting the source attribute*/
    document.querySelector('img').setAttribute('src', `output/${currentCountry}.svg`)

    /* Add three random and distinct countries to the current pool */
    for (let i = 0; i < amountButtons - 1; i++) {
        let randomCountryIndex = randomChoiceIndex(countryPool)

        let tempcountry = countryPool[randomCountryIndex]
        countryPool.splice(randomCountryIndex, 1)
        currentPool.push(tempcountry)
    }

    /* Shuffle List in Place */
    shuffleArray(currentPool)

    let i = 0
    document.querySelectorAll('.button').forEach(el => {

        el.innerHTML = currentPool[i]
        el.style.backgroundColor = '#e0e0e0'

        /* Reset Event Listeners */
        el.removeEventListener('click', clicked)
        el.addEventListener('click', clicked)

        i++
    })

    /* Fill the Country Pool as soon it does not meed a certain threshhold */
    if (countryPool.length < 10) {
        countryPool = [...countries]
    }
}

function clicked(el) {

    /* Get the clicked element */
    let clickedEl = el.path[0];
    
    /* Color the pressed Button with Red */
    /* If the right button was pressed this will be overwritten*/
    clickedEl.style.backgroundColor = '#ffcea4'
    
    /* Color the right Button with Green */
    document.querySelectorAll('.button').forEach(ele => {
        if (ele.innerHTML == currentCountry) {
            ele.style.backgroundColor = '#a4ffaa'
        };

        /* Remove event listener for each Button */
        ele.removeEventListener('click', clicked)
    })
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function randomChoiceIndex(list) {
    return Math.floor(Math.random() * list.length)
}

/* Connect Continue Button */
document.querySelector('.continue').addEventListener('click', next)

/* Start the Quiz */
next()