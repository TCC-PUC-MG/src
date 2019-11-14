package br.com.sca.monitbarragem.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.monitbarragem.web.rest.TestUtil;

public class SensorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sensor.class);
        Sensor sensor1 = new Sensor();
        sensor1.setId("id1");
        Sensor sensor2 = new Sensor();
        sensor2.setId(sensor1.getId());
        assertThat(sensor1).isEqualTo(sensor2);
        sensor2.setId("id2");
        assertThat(sensor1).isNotEqualTo(sensor2);
        sensor1.setId(null);
        assertThat(sensor1).isNotEqualTo(sensor2);
    }
}
