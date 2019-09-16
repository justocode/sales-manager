import React from 'react';
import _ from 'lodash';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfoIcon from '@material-ui/icons/Info';
import { ProductSortKeys } from '../../types/shopify.type';
import { ProductsState } from '../../stores/products.slice';
import Layout from '../Layout/Layout';
import withLayout from '../../hocs/withLayout';
import { utils } from '../../utils';

interface Props {
  query: {
    query: string;
    reverse: boolean;
    sortKey: ProductSortKeys;
    sortIndex: number;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    // width: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center'
  },
  empty: {
    display: 'block',
    width: '100%',
    textAlign: 'center'
  },
  loader: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    marginBottom: 30
  }
}));

function Patterns({ query }: Props) {
  const dispatch = useDispatch();
  const { firstPage, nextPage, data }: ProductsState = useSelector(({ products }) => products);
  const cursor = data ? (data.edges.length ? _.last(data.edges).cursor : '') : '';
  const hasNextpage = data ? data.pageInfo.hasNextPage : false;

  const theme = useTheme();
  const classes = useStyles(theme);
  let gridListCols = 4;

  if (useMediaQuery(theme.breakpoints.down('md'))) {
    gridListCols = 3;
  }

  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    gridListCols = 2;
  }

  if (useMediaQuery(theme.breakpoints.down('xs'))) {
    gridListCols = 1;
  }

  return (
    <Layout>
      {firstPage.loading && (
        <div className={classes.loader}>
          <CircularProgress size={24} />
        </div>
      )}

      {firstPage.error && <p>{firstPage.error.message}</p>}

      {data && (
        <>
          <div className={classes.products}>
            <Head>
              <title>Products - Sales manager</title>
            </Head>
            <GridList className={classes.gridList} cellHeight={500} cols={gridListCols} spacing={30}>
              {data.edges.map(({ node }) => {
                const images = node.images.edges;
                const imageSrc = images.length
                  ? images[0].node.transformedSrc
                  : 'http://www.netum.vn/public/default/img/icon/default-product-image.png';
                const altText = images.length ? images[0].node.altText : '';

                return (
                  <GridListTile key={node.handle}>
                    <img src={imageSrc} alt={altText} />
                    <GridListTileBar
                      title={node.title}
                      subtitle={<span>${node.priceRange.minVariantPrice.amount}</span>}
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          onClick={() =>
                            utils.link({
                              path: '/product',
                              params: {
                                handle: node.handle
                              }
                            })
                          }
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withLayout(Patterns);
