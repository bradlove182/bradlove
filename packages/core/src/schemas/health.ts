import { Schema } from "effect"

export class ControlPlaneHealth extends Schema.Class<ControlPlaneHealth>("ControlPlaneHealth")({
    service: Schema.Literal("control-plane"),
    status: Schema.Literal("healthy"),
}) {}
