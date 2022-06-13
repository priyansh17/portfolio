import React from 'react';
import { Container, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import staticData from '../stringConst';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SkillsData from './SkillsData';

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


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    const categories = ["All Skills", "Technical Skills", "Soft Skills", "Programming Languages", "Scripting Languages", "Database Knowledge", "Software Proficiency", "Development"];

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
                <TabPanel value={value} index={3}>
                    <ListGroup>
                    {
                        SkillsData.filter(skill => skill.type === categories[3] ).map((val, indexLi) => {
                            return (
                                <ListGroupItem key={indexLi}>
                                    {val['skill']} &nbsp; {val['rating']}
                                </ListGroupItem>
                            );
                        })
                    }
                    </ListGroup>
                </TabPanel>
                {
                    categories.map((category, cIndex) => {
                        return (
                            <TabPanel value={value} index={cIndex}>
                                <ListGroup>
                                    {
                                        SkillsData.filter(skill => skill.type === {category}).map((val, indexLi) => {
                                            return (
                                                <ListGroupItem key={indexLi}>
                                                    {val['skill']} &nbsp; {val['rating']}
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