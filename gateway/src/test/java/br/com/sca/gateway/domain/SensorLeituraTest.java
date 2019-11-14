package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class SensorLeituraTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SensorLeitura.class);
        SensorLeitura sensorLeitura1 = new SensorLeitura();
        sensorLeitura1.setId("id1");
        SensorLeitura sensorLeitura2 = new SensorLeitura();
        sensorLeitura2.setId(sensorLeitura1.getId());
        assertThat(sensorLeitura1).isEqualTo(sensorLeitura2);
        sensorLeitura2.setId("id2");
        assertThat(sensorLeitura1).isNotEqualTo(sensorLeitura2);
        sensorLeitura1.setId(null);
        assertThat(sensorLeitura1).isNotEqualTo(sensorLeitura2);
    }
}
