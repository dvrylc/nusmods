import * as React from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import LoadingSpinner from 'views/components/LoadingSpinner';
import { retryImport } from 'utils/error';
import ApiError from 'views/errors/ApiError';
import { Props } from './VenueLocation';

const AsyncVenueLocation = Loadable<Props, {}>({
  loader: () => retryImport(() => import(/* webpackChunkName: "venue" */ './VenueLocation')),
  loading: (props: LoadingComponentProps) => {
    if (props.error) {
      return <ApiError dataName="page" retry={props.retry} />;
    }

    if (props.pastDelay) {
      return <LoadingSpinner />;
    }

    return null;
  },
});

export default AsyncVenueLocation;
