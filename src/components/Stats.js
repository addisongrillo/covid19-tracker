import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import './Stats.css'


function Stats(props) {

    return (
        <>
            <Card className="statsCard">
                <CardContent className="statsCardContent">
                    <div className="statGroup">
                    <div className="keys">
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            Cases
                        </Typography>
                        <Divider />
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            New Cases Today
                        </Typography>
                        <Divider />
                    </div>
                    <div className="Numbers">
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            {parseInt(props.stats.cases).toLocaleString()}
                        </Typography>
                        <Divider />
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            {parseInt(props.stats.todayCases).toLocaleString()}
                        </Typography>
                        <Divider />
                    </div>
                    </div>
                    <div className="statGroup">
                    <div className="keys">
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            Deaths
                        </Typography>
                        <Divider />
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            New Deaths Today
                        </Typography>
                        <Divider />
                    </div>
                    <div className="Numbers">
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            {parseInt(props.stats.deaths).toLocaleString()}
                        </Typography>
                        <Divider />
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            {parseInt(props.stats.todayDeaths).toLocaleString()}
                        </Typography>
                        <Divider />
                    </div>
                    </div>
                    <div className="statGroup">
                    <div className="keys">
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            Recovered
                        </Typography>
                        <Divider />
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            Active
                        </Typography>
                        <Divider />
                    </div>
                    <div className="Numbers">
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            {parseInt(props.stats.recovered).toLocaleString()}
                        </Typography>
                        <Divider />
                        <Typography variant="h6" className="statType" color="textPrimary" gutterBottom>
                            {parseInt(props.stats.active).toLocaleString()}
                        </Typography>
                        <Divider />
                    </div>
                    </div>
                </CardContent>

            </Card>
        </>
    );
}

export default Stats;



