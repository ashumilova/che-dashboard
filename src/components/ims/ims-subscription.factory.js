/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import Register from '../utils/register.js';

/**
 * This class is handling the interface with Installation Manager Server (IMS) part of the API that relates to subscriptions.
 */
class ImsSubscriptionApi {

  /**
   * Default constructor for the subscription API.
   * @ngInject for Dependency injection
   */
  constructor($resource, $rootScope, imsSaasAuthApi) {

    // remote call
    this.remoteImsAPI = $resource('/im/subscription', {}, {
      addTrialSubscription: { method: 'POST', url: '/im/subscription' },
      checkSubscription: { method: 'GET', url: '/im/subscription' }
    });

    $rootScope.$watch(
      () => imsSaasAuthApi.promise,
      (newValue, oldValue) => this._loginChanged(newValue, oldValue)
    );
  }

  /**
   * Checks if the user logged on SaaS has an active on-prem subscription.
   */
  checkOnPremisesSubscription() {
    let serverPromise = this.remoteImsAPI.checkSubscription().$promise;
    this.promise =  serverPromise.then(response => this._gotSubscription(response)).catch(response => this._failedSubscription(response));
    return this.promise;
  }

  _gotSubscription(response) {
    return response;
  }

  _failedSubscription(response) {
    switch (response.status) {
      case 404:// Subscription not found
        return { state: 'NO_SUBSCRIPTION' };
      case 403:// SaaS User is not authenticated or authentication token is expired
      case 500:// server error
        throw response.status;
      default:// unspecified error
        throw response.status;
    }
  }

  _loginChanged(newValue, oldValue) {
    if (newValue && newValue !== oldValue) {
      this.checkOnPremisesSubscription();
    }
  }

  isActive(subscription) {
    return (subscription && subscription.state === 'ACTIVE');
  }
}

// Register this factory
Register.getInstance().factory('imsSubscriptionApi', ImsSubscriptionApi);
