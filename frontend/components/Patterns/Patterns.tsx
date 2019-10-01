import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CheckIcon from '@material-ui/icons/Check';

// Colors
import { lightGreen } from '@material-ui/core/colors';

// Components
import Layout from '../Layout/Layout';
import IChip from '../common/IChip';

// Models
import { PATTERN } from '../../types/amz-shirt.type';

import { services } from '../../services';
import { utils } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pattern: {
      position: 'relative',
      marginLeft: 10,
      marginRight: 5,
      maxWidth: 345,
      minWidth: 200,
      width: 200,
      height: 200,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    patternDeactived: {
      backgroundColor: 'gray'
    },
    patternInfo: {
      paddingLeft: 20
    },
    patternColor: {
      position: 'relative',
      paddingTop: 15,
      paddingBottom: 15,
      textAlign: 'center',
      cursor: 'pointer',
    },
    patternColorAvailable: {
      opacity: 1
    },
    media: {
      height: 140,
      backgroundSize: 'contain'
    },
    expandDetail: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    checkedIcon: {
      display: 'none'
    },
    checked: {
      display: 'inline-block',
      position: 'absolute',
      top: 5,
      left: 5,
      background: lightGreen[500]
    },
    colorChecked: {
      left: 60,
    }
  })
);

const defaultPatterns = () => {
  let returnedData = {};

  Object.keys(services.patternStore.patterns).map(key => {
    returnedData[key] = {
      isUsed: true,
      colors: services.patternStore.patterns[key],
    };
  });

  return returnedData;
};

const ManagePatterns = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [patterns, setPatterns] = utils.useStateWithLocalStorage('patterns', defaultPatterns);

  function togglePatternColor(patternName: string, patternColor: any) {
    setPatterns((patterns: any) => {
      let pattern = patterns[patternName];
      pattern.colors.map((patternColorItem: any) => {
        if (patternColorItem.hex === patternColor.hex) {
          patternColorItem.isDefault = !patternColorItem.isDefault;
        }
      });

      return { ...patterns, [patternName]: pattern };
    });
  }

  function togglePattern(e: any, patternName: string) {
    e.stopPropagation();

    setPatterns((patterns: any) => {
      let pattern = patterns[patternName];
      pattern.isUsed = !pattern.isUsed;

      return { ...patterns, [patternName]: pattern };
    });
  }

  return (
    <Layout>
      {
        Object.keys(patterns).map((key: string) => {
          const pattern: any = _.get(patterns, [key, 'colors', 0]);

          return (
            <ExpansionPanel key={'pattern-' + key}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={'pattern-content-' + key}
                id={'pattern-header-' + key}
                className={clsx({ [classes.patternDeactived]: !patterns[key].isUsed })}
              >
                <Card className={classes.pattern} onClick={e => togglePattern(e, key)}>
                  <CardActionArea>
                    <CardMedia className={classes.media} image={pattern.fileSrc} title={pattern.name} />
                  </CardActionArea>
                  <CheckIcon
                    className={clsx(classes.checkedIcon, {
                      [classes.checked]: patterns[key].isUsed
                    })}
                  />
                </Card>
                <div className={classes.patternInfo}>
                  <div>
                    <Typography variant="h5" component="h5">
                      {key}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h5" component="h5">
                      Default Colors:
                    </Typography>
                    {_.get(patterns, [key, 'colors']).map((patternColor: any, patternColorIndex: number) => (
                      <IChip
                        key={'patternColorItem-' + patternColor.hex}
                        label={patternColor.name}
                        color={patternColor}
                        onClick={[togglePatternColor, key, patternColor]}
                        className={clsx({[classes.patternColorAvailable]: patternColor.isDefault})}
                      />
                    ))}
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expandDetail}>
                <Grid container>
                  {_.get(patterns, [key, 'colors']).map((patternColor: any, patternColorIndex: number) => {
                    return (
                      <Grid
                        className={classes.patternColor}
                        key={'patternColor-' + patternColor.fileName}
                        item xs={4} sm={3} lg={2}
                      >
                        <img
                          className={classes.media}
                          src={patternColor.fileSrc}
                          alt={patternColor.fileName}
                          onClick={e => {togglePatternColor(key, patternColor)}}
                        />
                        <CheckIcon
                          className={clsx(classes.checkedIcon, classes.colorChecked, {
                            [classes.checked]: patternColor.isDefault
                          })}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })
      }
    </Layout>
  );
};

export default ManagePatterns;
