export const overlay_frag = `
precision highp float;
precision highp sampler2D;

uniform vec2 uTexSizeInv;
uniform sampler2D tEdgeTexture;
uniform vec3 uHighlightEdgeColor;
uniform vec3 uSelectEdgeColor;
uniform float uHighlightEdgeStrength;
uniform float uSelectEdgeStrength;
uniform float uGhostEdgeStrength;
uniform float uInnerEdgeFactor;
uniform vec3 uMarkerEdgePalette[8]; // marker channel edge colors (ezMechanism)

void main() {
    vec2 coords = gl_FragCoord.xy * uTexSizeInv;
    vec4 edgeValue = texture2D(tEdgeTexture, coords);
    if (edgeValue.a > 0.0) {
        // Decode the marker byte carried in .b: 1/3 -> highlight, 2 -> select,
        // >= 4 -> channel palette (value 4 + 2*index, ezMechanism).
        float m = floor(edgeValue.b * 255.0 + 0.5);
        vec3 edgeColor;
        float edgeStrength;
        if (m >= 4.0) {
            int markerIndex = int(floor((m - 4.0) / 2.0));
            edgeColor = uMarkerEdgePalette[0];
            edgeStrength = uSelectEdgeStrength;
            #pragma unroll_loop_start
            for (int i = 0; i < 8; ++i) {
                if (UNROLLED_LOOP_INDEX == markerIndex) {
                    edgeColor = uMarkerEdgePalette[i];
                }
            }
            #pragma unroll_loop_end
        } else if (m == 2.0) {
            edgeColor = uSelectEdgeColor;
            edgeStrength = uSelectEdgeStrength;
        } else {
            edgeColor = uHighlightEdgeColor;
            edgeStrength = uHighlightEdgeStrength;
        }
        gl_FragColor.rgb = edgeValue.g > 0.0 ? edgeColor : edgeColor * uInnerEdgeFactor;
        gl_FragColor.a = (edgeValue.r == 1.0 ? uGhostEdgeStrength : 1.0) * edgeValue.a;
        gl_FragColor.a *= edgeStrength;
    } else {
        gl_FragColor = vec4(0.0);
    }
}
`;