/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * @ngdoc controller
 * @name dashboard.controller:DashboardLastProjectsCtrl
 * @description This class is handling the controller of the last projects to display in the dashboard
 * @author Florent Benoit
 */
class DashboardLastProjectsCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor(codenvyProject, codenvyWorkspace, $location) {
    this.codenvyProject = codenvyProject;
    this.codenvyWorkspace = codenvyWorkspace;
    this.$location = $location;

    this.state = 'loading';

    // fetch workspaces when initializing
    let promise = this.codenvyWorkspace.fetchWorkspaces();

    this.projects = this.codenvyProject.getAllProjects();

    promise.then(() => {
          this.checkIfWorkspaces();
          this.state = 'OK';
        },
        (error) => {
          if (error.status === 304) {
            // ok
            this.checkIfWorkspaces();
            this.state = 'OK';
            return;
          }
          this.state = 'error';
        });
  }


  checkIfWorkspaces() {
    let workspaces = this.codenvyWorkspace.getWorkspaces();
    if (workspaces.length === 0) {
      // needs to redirect to the create project workflow
      this.$location.path('/create-project');
    }
  }

  getProjects() {
    return this.projects;
  }


}

export default DashboardLastProjectsCtrl;

