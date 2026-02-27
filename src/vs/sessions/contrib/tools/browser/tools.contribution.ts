/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../../workbench/common/contributions.js';
import { IViewDescriptorService, ViewContainerLocation } from '../../../../workbench/common/views.js';

class SessionsToolsRelocationContribution implements IWorkbenchContribution {

	static readonly ID = 'sessions.tools.relocation';

	private static readonly TOOL_CONTAINER_IDS = [
		'workbench.view.search',
		'workbench.view.scm',
		'workbench.view.debug',
		'workbench.view.extensions',
	] as const;

	constructor(
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
	) {
		for (const id of SessionsToolsRelocationContribution.TOOL_CONTAINER_IDS) {
			const viewContainer = viewDescriptorService.getViewContainerById(id);
			if (!viewContainer) {
				continue;
			}

			const location = viewDescriptorService.getViewContainerLocation(viewContainer);
			if (location === ViewContainerLocation.Sidebar) {
				viewDescriptorService.moveViewContainerToLocation(viewContainer, ViewContainerLocation.Panel, undefined, SessionsToolsRelocationContribution.ID);
			}
		}
	}
}

registerWorkbenchContribution2(SessionsToolsRelocationContribution.ID, SessionsToolsRelocationContribution, WorkbenchPhase.AfterRestored);

