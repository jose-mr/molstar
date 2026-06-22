export const apply_marker_color = `

#if defined(dColorMarker)
    if (marker > 0.0) {
        if (marker >= 4.0) {
            // Channel marks (ezMechanism): byte value 4 + 2*index -> palette[index].
            int markerIndex = int(floor((marker - 4.0) / 2.0));
            #pragma unroll_loop_start
            for (int i = 0; i < 8; ++i) {
                if (UNROLLED_LOOP_INDEX == markerIndex) {
                    gl_FragColor.rgb = mix(gl_FragColor.rgb, uMarkerPalette[i], uSelectStrength);
                    gl_FragColor.a = max(gl_FragColor.a, uSelectStrength * 0.002);
                }
            }
            #pragma unroll_loop_end
        } else if ((uMarkerPriority == 1 && marker != 2.0) || (uMarkerPriority != 1 && marker == 1.0)) {
            gl_FragColor.rgb = mix(gl_FragColor.rgb, uHighlightColor, uHighlightStrength);
            gl_FragColor.a = max(gl_FragColor.a, uHighlightStrength * 0.002); // for direct-volume rendering
        } else {
            gl_FragColor.rgb = mix(gl_FragColor.rgb, uSelectColor, uSelectStrength);
            gl_FragColor.a = max(gl_FragColor.a, uSelectStrength * 0.002); // for direct-volume rendering
        }
    } else if (uMarkerAverage > 0.0) {
        gl_FragColor.rgb = mix(gl_FragColor.rgb, uDimColor, uDimStrength);
        gl_FragColor.a = max(gl_FragColor.a, uDimStrength * 0.002); // for direct-volume rendering
    }
#endif
`;