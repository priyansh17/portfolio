import React from 'react';
import { Container, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import staticData from '../stringConst';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SkillsData from './SkillsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div hidden={value !== index} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function SkillsPage(props) {


    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    const categories = ["Technical Skills", "Soft Skills", "Programming Languages", "Scripting Languages", "Database Knowledge", "Development"];

    const checkDecimal = (val) => {
        if (parseFloat(val) % 1 !== 0) {
            return (
                <FontAwesomeIcon icon={faStarHalf} />
            );
        }
    }

    return (
        <Container>
            <Row>
                <p id='pageHeader'>{staticData["SkillsPageHeading"]}</p>
            </Row>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} textColor="inherit" variant="scrollable">
                        {categories.map((val, ind) => {
                            return (
                                <Tab key={ind} label={val} />
                            );
                        })}
                    </Tabs>
                </Box>
                {
                    categories.map((category, cIndex) => {
                        return (
                            <TabPanel key={cIndex} value={value} index={cIndex}>
                                <ListGroup>
                                    {
                                        SkillsData.sort((a,b)=> b.rating-a.rating).filter(skill => skill.type === category).map((val, indexLi) => {
                                            return (
                                                <ListGroupItem key={indexLi} style={{ margin: '0.5vh', display: 'inline-flex', justifyContent: 'space-between' }}>
                                                    {val['skill']}
                                                    <div>
                                                        {   
                                                            [...Array(Math.floor(parseInt(val['rating'])))].map((el, i) => {
                                                                return (
                                                                    <FontAwesomeIcon icon={faStar} />
                                                                );
                                                            })
                                                        }
                                                        {checkDecimal(val['rating'])}
                                                    </div>

                                                </ListGroupItem>
                                            );
                                        })
                                    }
                                </ListGroup>
                            </TabPanel>
                        );
                    })
                }
            </Box>
        </Container>
    );
}

export default SkillsPage;