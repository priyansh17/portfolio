import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function ProjectsCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandVertIcon = (event) => {
        setExpanded2(!expanded2);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setExpanded2(false);
        setAnchorEl(null);
    }

    const MoreOptions = [
        "View code on Github"
    ];

    const openUrl = () => {
       window.open(props.githubUrl, '_blank', 'noopener,noreferrer');
    }

    const openMenu = Boolean(expanded2);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[200] }}>
                        {props.displayChar}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="more" onClick={handleExpandVertIcon} aria-haspopup="true" >
                        <MoreVertIcon />
                        <Menu id="moreOptions" anchorEl={anchorEl} onClose={handleClose} open={openMenu}>
                            {MoreOptions.map((option, index) => (
                                <MenuItem key={index} onClick={openUrl}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </IconButton>
                }
                title={props.name}
                subheader={props.date}
            />
            <CardMedia>
                <img src={props.image} alt="Project Pic" className='ProjectCardImage' />
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.desc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>PROJECT DETAILED DESCRIPTION</Typography>
                    <Typography paragraph>
                        {props.para1}
                    </Typography>
                    <Typography paragraph>
                        {props.para2}
                    </Typography>
                    <Typography paragraph>
                        {props.para3}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default ProjectsCard;