import { Schema } from "effect"

export class ControlPlaneHealth extends Schema.Class<
    ControlPlaneHealth,
    { readonly brand: unique symbol }
>("ControlPlaneHealth")({
    service: Schema.Literal("control-plane"),
    status: Schema.Literal("healthy"),
}) {}
