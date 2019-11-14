package br.com.sca.segcomunicacao.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.segcomunicacao.web.rest.TestUtil;

public class OrgaoGovernoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrgaoGoverno.class);
        OrgaoGoverno orgaoGoverno1 = new OrgaoGoverno();
        orgaoGoverno1.setId("id1");
        OrgaoGoverno orgaoGoverno2 = new OrgaoGoverno();
        orgaoGoverno2.setId(orgaoGoverno1.getId());
        assertThat(orgaoGoverno1).isEqualTo(orgaoGoverno2);
        orgaoGoverno2.setId("id2");
        assertThat(orgaoGoverno1).isNotEqualTo(orgaoGoverno2);
        orgaoGoverno1.setId(null);
        assertThat(orgaoGoverno1).isNotEqualTo(orgaoGoverno2);
    }
}
