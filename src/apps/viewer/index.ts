/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import './embedded.html';
import './favicon.ico';
import './index.html';
import '../../mol-plugin-ui/skin/light.scss';
export * from './app';


// expose modules
import { Script } from '../../mol-script/script';
import { QueryContext, StructureSelection } from '../../mol-model/structure';
import { MolScriptBuilder } from '../../mol-script/language/builder';
import { PluginSpec } from '../../mol-plugin/spec'
import { StructureRepresentationProvider } from '../../mol-repr/structure/representation';
import { StructureQuery } from '../../mol-model/structure/query';
import { StructureSelectionQuery } from '../../mol-plugin-state/helpers/structure-selection-query'
import { Structure } from '../../mol-model/structure';
import { StateTransforms } from '../../mol-plugin-state/transforms';
import { AddTrajectory } from '../../mol-plugin-state/actions/structure';
import { UpdateTrajectory } from '../../mol-plugin-state/actions/structure';
import { TrajectoryFromModelAndCoordinates } from '../../mol-plugin-state/transforms/model';
import { setSubtreeVisibility } from '../../mol-plugin/behavior/static/state';
import { Color } from "../../mol-util/color"


(window as any).Script = Script;
(window as any).StructureSelection = StructureSelection;
(window as any).QueryContext = QueryContext;
(window as any).MolScriptBuilder = MolScriptBuilder;
(window as any).PluginSpec = PluginSpec;
(window as any).StructureRepresentationProvider = StructureRepresentationProvider;
(window as any).StructureQuery = StructureQuery;
(window as any).Structure = Structure;
(window as any).StructureSelectionQuery = StructureSelectionQuery;
(window as any).StateTransforms = StateTransforms;
(window as any).AddTrajectory = AddTrajectory;
(window as any).UpdateTrajectory = UpdateTrajectory;
(window as any).TrajectoryFromModelAndCoordinates = TrajectoryFromModelAndCoordinates;
(window as any).setSubtreeVisibility = setSubtreeVisibility;
(window as any).Color = Color;



