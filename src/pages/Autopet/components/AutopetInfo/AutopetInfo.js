import { useEffect, useState } from 'react';

import { Link } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';

import classNames from 'classnames';

import { infoStyles } from '../../styles';
import AutopetInfoCard from './AutopetInfoCard';
import autopetApi from '../../../../api/autopet.api';
import thegraph from '../../../../api/thegraph';

import ghstIcon from '../../../../assets/images/ghst-doubleside.gif'

const contractUrl = 'https://polygonscan.com/address/0x715FB0175ebCa2802855D8AdCc93fd913EF60E93'

export default function AutopetInfo() {
    const classes = infoStyles();
    const [ fee, setFee ] = useState(null);
    const [ frens, setFrens ] = useState(null);
    const [ totalStaked, setStaked ] = useState(null);
    const [ totalGotchis, setTotalGotchis ] = useState(null);
    const [ totalUsers, setTotalUsers ] = useState(null);

    useEffect(() => {
        autopetApi.getUsers().then( users => {
            thegraph.getGotchisByAddresses(users).then( gotchis => {
                setTotalGotchis(gotchis.length);
                setTotalUsers(users.length);
            });
        });

        autopetApi.getFee().then( fee => {
            setFee(fee);
        });

        autopetApi.getFrens().then( frens => {
            setFrens(frens);
        });
    }, []);

    useEffect(() => {
        setStaked(totalUsers*fee);
    }, [totalUsers, fee]);

    return (
        <div
            className={classes.autopetInfo}
        >
            <AutopetInfoCard 
                name='Gotchis'
                count={totalGotchis}
            />
            <AutopetInfoCard 
                name='Accounts'
                count={totalUsers}
            />
            <Link
                href={contractUrl}
                target='_blank'
                className={classNames(classes.autopetInfoCard, classes.autopetInfoLink)}
            >
                Contract
                <CallMadeIcon className={classes.autopetInfoIcon} />
            </Link>
            <AutopetInfoCard
                name='Fee'
                count={
                    totalStaked > 0 ? 
                    <>
                        {fee}
                        <img src={ghstIcon} alt='ghst icon' className={classes.autopetInfoGhst} />
                    </> : null
                }
            />
            <AutopetInfoCard
                name='Frens'
                count={frens}
            />
            <AutopetInfoCard
                name='Staked'
                count={
                    totalStaked > 0 ? 
                        <>
                            {totalStaked}
                            <img src={ghstIcon} alt='ghst icon' className={classes.autopetInfoGhst} />
                        </> : null
                }
            />
        </div>
    )
}
