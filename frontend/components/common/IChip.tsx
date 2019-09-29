import React, { useRef } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      float: 'left',
      marginRight: 5,
      marginBottom: theme.spacing(1),
      padding: 8,
      // width: 50,
      borderRadius: 10,
      textAlign: 'center',
      opacity: 0.3,
      borderWidth: 1,
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
      cursor: 'pointer'
    },
    priceContent: {
      width: 60,
      marginLeft: 5,
      fontSize: '0.8em',
    }
  })
);

const IChip = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { color, onClick, className, label, size, chipType, editable, onEdit } = props;
  const inputPriceElm = useRef();

  /** @type {{search: React.CSSProperties}} */
  const styles = {
    backgroundColor: color ? color.hex : '#e0e0e0',
    color: color ? 'white' : 'black',
    borderColor: '#e0e0e0'
  };

  function clickOnChip() {
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  function clickToInputElm(event: React.MouseEvent) {
    event.stopPropagation();
  }

  function onChange(value: any) {
    const REGEX = /^\d+(\.\d{1,2})?$/;

    if (REGEX.test(value)) {
      onEdit(size, value);
    } else {
      // inputPriceElm.current
    }
  }

  return (
    <div className={clsx(classes.root, className)} onClick={clickOnChip} style={styles}>
      <span>{label}</span>
      {
        chipType === IChip.type.input && editable ? (
          <input type="number" className={classes.priceContent}
            ref={inputPriceElm}
            onClick={e => clickToInputElm(e)}
            onChange={e => onChange(e.target.value)}
            value={size.price}
          />
        ) : null
      }
    </div>
  );
};

IChip.type = {
  default: 0,
  input: 1
};

export default IChip;
