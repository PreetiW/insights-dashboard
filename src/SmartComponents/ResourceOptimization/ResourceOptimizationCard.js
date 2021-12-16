import * as AppActions from '../../AppActions';

import React, { useEffect } from 'react';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/RouterParams';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import { UI_BASE } from '../../AppConstants';
import { Button } from '@patternfly/react-core';
import { useChromePush } from '../../Utilities/hooks/useChromePush';

const ResourceOptimizationCard = ({
    fetchRosIsConfigured, rosIsConfiguredFetchStatus, rosIsConfigured
}) =>{
    const intl = useIntl();

    useEffect(() => {
        fetchRosIsConfigured();
    }, [fetchRosIsConfigured]);

    const navigateTo = useChromePush();

    return (
        <ExpandableCardTemplate
            appName="ResourceOptimization"
            className='insd-m-toggle-right-on-md'
            title={intl.formatMessage(messages.resourceOptimizationCardHeader)}
            isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_ros') || 'true')}
            isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_ros', isExpanded)}
            body={
                <TemplateCardBody>
                    {
                        rosIsConfiguredFetchStatus === 'fulfilled' &&
                        (
                            rosIsConfigured.success ?
                                <React.Fragment>
                                    <div>{ intl.formatMessage(messages.rosSystemsGenericMessage)}</div>
                                    <Flex
                                        direction={{ default: 'column' }}
                                        alignItems={{ default: 'alignItemsCenter' }}
                                    >
                                        <Flex
                                            justifyContent={{ default: 'justifyContentCenter' }}
                                            spaceItems={{ default: 'spaceItemsLg', sm: 'spaceItems2xl' }}>
                                            <Flex
                                                direction={{ default: 'column' }}
                                                spaceItems={{ default: 'spaceItemsNone' }}
                                                alignItems={{ default: 'alignItemsCenter' }}>
                                                {/* fixme: Need to update it to use values from backend once the API is updated  */}
                                                <span className='pf-u-font-size-2xl pf-u-color-100 pf-u-font-weight-bold'>
                                                2
                                                </span>
                                                <span className='pf-u-font-size-sm'>
                                                Systems waiting for data
                                                </span>
                                            </Flex>
                                            <Flex
                                                direction={{ default: 'column' }}
                                                spaceItems={{ default: 'spaceItemsNone' }}
                                                alignItems={{ default: 'alignItemsCenter' }}>
                                                {/* fixme: Need to update it to use values from backend once the API is updated  */}
                                                <span className='pf-u-font-size-2xl pf-u-color-100 pf-u-font-weight-bold'>
                                                10
                                                </span>
                                                <span className='pf-u-font-size-sm'>
                                                Systems with suggestions
                                                </span>
                                            </Flex>
                                            <Flex
                                                direction={{ default: 'column' }}
                                                spaceItems={{ default: 'spaceItemsNone' }}
                                                alignItems={{ default: 'alignItemsCenter' }}>
                                                {/* fixme: Need to update it to use values from backend once the API is updated  */}
                                                <span className='pf-u-font-size-2xl pf-u-color-100 pf-u-font-weight-bold'>
                                                15
                                                </span>
                                                <span className='pf-u-font-size-sm'>
                                                Total systems
                                                </span>
                                            </Flex>
                                        </Flex>
                                        <Button
                                            variant='secondary'
                                            isSmall component='a'
                                            onClick={e => navigateTo(e, `${UI_BASE}/ros`)}
                                            href={ `${UI_BASE}/ros`}>
                                            {intl.formatMessage(messages.rosCardViewSystemsCTA)}
                                        </Button>
                                    </Flex>

                                </React.Fragment>
                                : <Flex
                                    direction={{ default: 'column' }}
                                    alignItems={{ default: 'alignItemsCenter' }}
                                >
                                    <FlexItem>{ intl.formatMessage(messages.rosSystemsNotConfiguredMessage)}</FlexItem>
                                    <Button
                                        variant='secondary'
                                        isSmall component='a'
                                        onClick={e => navigateTo(e, `${UI_BASE}/ros`)}
                                        href={ `${UI_BASE}/ros`}>
                                        {intl.formatMessage(messages.rosCardConfigureSystemsCTA)}
                                    </Button>
                                </Flex>
                        )

                    }
                    {rosIsConfiguredFetchStatus === 'pending' && <Loading />}
                    {rosIsConfiguredFetchStatus === 'rejected' && <FailState appName='Resource optimization' />}
                </TemplateCardBody>
            }
        />

    );
};

ResourceOptimizationCard.propTypes = {
    fetchRosIsConfigured: PropTypes.func,
    rosIsConfigured: PropTypes.object,
    rosIsConfiguredFetchStatus: PropTypes.string
};

const mapStateToProps = ({ DashboardStore }) => ({
    rosIsConfigured: DashboardStore.rosIsConfigured,
    rosIsConfiguredFetchStatus: DashboardStore.rosIsConfiguredFetchStatus
});

const mapDispatchToProps = dispatch => ({
    fetchRosIsConfigured: () => dispatch(AppActions.fetchRosIsConfigured())
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceOptimizationCard));
