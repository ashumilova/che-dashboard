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

class OnPremisesAdminBridgeYourSubscriptionCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($rootScope, imsSaasAuthApi, imsSubscriptionApi) {
    $rootScope.$watch(
      () => imsSaasAuthApi.promise,
      newValue => { this.updateLoggedInStatus(newValue); }
    );
    this.imsSubscriptionApi = imsSubscriptionApi;
    this.subscriptionState = 'NO_SUBSCRIPTION';
  }

  updateLoggedInStatus(authValue) {
    if (!authValue) {
      this.subscriptionState = 'NO_SUBSCRIPTION';
    } else {
      this.imsSubscriptionApi.checkOnPremisesSubscription().then(_ => this.updateSubscriptionState(_));
    }
  }

  updateSubscriptionState(newValue) {
    if (newValue && this.imsSubscriptionApi.isActive(newValue)) {
      this.subscriptionState = 'SUBSCRIPTION';
      this.expirationDate = new Date(newValue.endDate);
    } else {
      this.subscriptionState = 'NO_SUBSCRIPTION';
    }
  }

  setHasSubscription(value) {
    this.subscriptionState = value;
  }

  showNotSubscribed() {
    return (this.subscriptionState === 'NO_SUBSCRIPTION');
  }
}

export default OnPremisesAdminBridgeYourSubscriptionCtrl;
