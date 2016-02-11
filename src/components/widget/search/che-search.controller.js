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

/**
 * This class is handling the controller for the simple selecter (only allowing to select the widget)
 * @author Florent Benoit
 */
export class CheSearchCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
    this.isShown = false;
  }

  /**
   *
   */
  show() {
    if (this.isShown) {
      return;
    }
    if (this.replaceElement) {
      let element = angular.element('#' + this.replaceElement);
      element.css('display', 'none');
      this.$element.css('flex', '1 1');
      this.$element.find('input').focus();
    }
    this.isShown = true;
  }

  /**
   *
   */
  hide() {
    this.isShown = false;
    if (this.replaceElement) {
      let element = angular.element('#' + this.replaceElement);
      element.css('display', 'flex');
      this.$element.css('flex', 'none');
    }
  }
}
