import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbardisplay = () => {
    const [navbarData, setNavbarData] = useState({});

    useEffect(() => {
        // Fetch data from the API when the component mounts
        axios.get('https://mediumblue-jellyfish-250677.hostingersite.com/api/navbar')
            .then(response => {
                const data = response.data;

                // Sort data by 'id' in descending order and get the first item
                const lastItem = data.sort((a, b) => b.id - a.id)[0];

                // Prepend base URL to the image field if it is not already absolute
                const baseUrl = 'https://mediumblue-jellyfish-250677.hostingersite.com';
                lastItem.image = lastItem.image.startsWith('http') ? lastItem.image : baseUrl + lastItem.image;

                setNavbarData(lastItem);
            })
            .catch(error => {
                console.error('Error fetching navbar data:', error);
            });
    }, []);
console.log(navbarData)
    return (
        <nav
            className="navbar navbar-light"
            style={{ backgroundColor: navbarData.background_color }}
        >
            <div className="container-fluid">
                {navbarData.image && (
                    <a className="navbar-brand" href="#">
                        <img
                            src={navbarData.image}
                            alt="Navbar"
                            style={{ height: '70px' }}
                            
                        />
                    </a>
                    
                )}
              

            </div>
        </nav>
    );
};

export default Navbardisplay;
